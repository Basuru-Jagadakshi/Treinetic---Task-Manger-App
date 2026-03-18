import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
    taskForm: FormGroup;
    isEditMode: boolean = false;
    taskId?: number;
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.taskForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', Validators.maxLength(500)],
            status: ['TO_DO', Validators.required]
        });
    }

    ngOnInit() {
        this.taskId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.taskId) {
            this.isEditMode = true;
            this.loadTask(this.taskId);
        }
    }

    loadTask(id: number) {
        this.taskService.getTaskById(id).subscribe({
            next: (task) => {
                this.taskForm.patchValue({
                    title: task.title,
                    description: task.description,
                    status: task.status
                });
            },
            error: (err) => {
                console.error(err);
                this.router.navigate(['/tasks']);
            }
        });
    }

    onSubmit() {
        if (this.taskForm.invalid) return;

        this.loading = true;
        const taskData: Task = this.taskForm.value;

        if (this.isEditMode && this.taskId) {
            this.taskService.updateTask(this.taskId, taskData).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: (err) => {
                    console.error(err);
                    this.loading = false;
                }
            });
        } else {
            this.taskService.createTask(taskData).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: (err) => {
                    console.error(err);
                    this.loading = false;
                }
            });
        }
    }
}
