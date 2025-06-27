import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroService } from '../../core/services/registro.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]] // <-- El campo se llama "password"
    });
  }

  onSubmit() {
    this.loginError = null;
    if (this.loginForm.invalid) {
      this.loginError = 'Por favor completa todos los campos correctamente.';
      return;
    }
    this.isLoading = true;
    const { correo, password } = this.loginForm.value; // <-- Extrae "password"
    this.registroService.login({ correo, password }).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res && res.success) {
          this.router.navigate(['/menu']);
        } else {
          this.loginError = res.message || 'Correo o contraseña incorrectos.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = err?.error?.message || 'Correo o contraseña incorrectos.';
      }
    });
  }
}
