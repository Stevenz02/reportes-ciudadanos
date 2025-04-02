import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Crear el formulario con validaciones
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }  

  // Envío del formulario
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('✅ Login:', this.loginForm.value);
      // Aquí puedes conectar con tu backend
    } else {
      console.log('❌ Formulario inválido');
      this.loginForm.markAllAsTouched();
    }
  }
}

