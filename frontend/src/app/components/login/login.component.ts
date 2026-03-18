import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/tasks']);
        }
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe({
                next: () => {
                    this.router.navigate(['/tasks']);
                },
                error: err => {
                    this.error = err.error?.message || 'Login failed Check credentials.';
                }
            });
    }
}
