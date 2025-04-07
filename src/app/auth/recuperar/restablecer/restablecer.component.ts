import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restablecer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.scss']
})
export class RestablecerComponent {
  form!: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nuevaPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.form.valid && this.passwordsCoinciden()) {
      const identificacionRecuperar = localStorage.getItem('identificacionRecuperar');
      const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
      console.log('Identificación almacenada:', identificacionRecuperar);
      console.log('Usuario actual:', usuarioActual);
  
      if (usuarioActual && usuarioActual.identificacion === identificacionRecuperar) {
        // ✅ Cambiar la contraseña
        usuarioActual.password = this.form.value.nuevaPassword;
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
  
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2500);
      } else {
        alert('❌ Usuario no encontrado');
      }
    } else {
      this.form.markAllAsTouched();
    }
  }  

  passwordsCoinciden(): boolean {
    return this.form.value.nuevaPassword === this.form.value.confirmarPassword;
  }
}

// ✅ Validador personalizado
export const passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('nuevaPassword');
  const confirmPassword = form.get('confirmarPassword');

  if (!password || !confirmPassword) return null;

  const mismatch = password.value !== confirmPassword.value;

  if (mismatch) {
    confirmPassword.setErrors({ passwordMismatch: true });
  } else {
    if (confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
  }

  return mismatch ? { passwordMismatch: true } : null;
};

