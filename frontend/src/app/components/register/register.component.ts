import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    error: string = '';
    success: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/tasks']);
        }
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.registerForm.invalid) return;

        this.authService.register(this.registerForm.value.username, this.registerForm.value.password)
            .subscribe({
                next: () => {
                    this.success = 'Registration successful! You can now login.';
                    setTimeout(() => this.router.navigate(['/login']), 2000);
                },
                error: err => {
                    this.error = err.error?.message || 'Registration failed';
                }
            });
    }
}
