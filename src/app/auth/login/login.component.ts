import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false; // 🚀 Loading para el botón

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToRecuperar() {
    this.router.navigate(['/auth/recuperar']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; // ⏳ Activa loading

      const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');

      setTimeout(() => { // Simulamos pequeño tiempo de espera
        if (
          usuarioActual &&
          this.loginForm.value.correo === usuarioActual.correo &&
          this.loginForm.value.contrasena === usuarioActual.password
        ) {
          this.mostrarSnackBar('✅ Inicio de sesión exitoso', 'success');
          this.router.navigate(['/auth/dashboard']);
          this.isLoading = false; // 🔚 Desactiva loading
          return;
        } else {
          this.mostrarSnackBar('❌ Usuario o contraseña incorrectos', 'error');
          this.isLoading = false; // 🔚 Desactiva loading
        }
      }, 800); // Simulación para UX
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  mostrarSnackBar(mensaje: string, tipo: 'success' | 'error') {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 3000,
      panelClass: tipo === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
}


