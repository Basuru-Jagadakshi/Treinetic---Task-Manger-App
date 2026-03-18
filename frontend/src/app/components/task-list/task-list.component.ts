import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    filteredTasks: Task[] = [];
    statusFilter: string = 'ALL';

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getAllTasks().subscribe({
            next: (data) => {
                this.tasks = data;
                this.applyFilter();
            },
            error: (err) => console.error(err)
        });
    }

    applyFilter() {
        if (this.statusFilter === 'ALL') {
            this.filteredTasks = this.tasks;
        } else {
            this.filteredTasks = this.tasks.filter(t => t.status === this.statusFilter);
        }
    }

    deleteTask(id: number | undefined) {
        if (!id || !confirm('Are you sure you want to delete this task?')) return;
        this.taskService.deleteTask(id).subscribe({
            next: () => this.loadTasks(),
            error: (err) => console.error(err)
        });
    }

    getStatusBadgeClass(status: string): string {
        switch (status) {
            case 'TO_DO': return 'bg-secondary';
            case 'IN_PROGRESS': return 'bg-primary';
            case 'DONE': return 'bg-success';
            default: return 'bg-secondary';
        }
    }

    formatStatus(status: string): string {
        return status.replace('_', ' ');
    }
}
