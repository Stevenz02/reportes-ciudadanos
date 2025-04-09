import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CallApiServiceService } from '../../../call-api-service.service';
import { RecoveryService } from '../../../services/recovery.service';

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
  providers: [CallApiServiceService],
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.scss']
})
export class RestablecerComponent {
  form!: FormGroup;
  success = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private apiService: CallApiServiceService,
    private recoveryService: RecoveryService
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.form.valid && this.passwordsCoinciden()) {
      const documentNumber = this.recoveryService.getDocumentNumber();

      if (!documentNumber) {
        alert('❌ Error: No se encontró el número de documento.');
        return;
      }

      const payload = { newPassword: this.form.value.newPassword };

      this.apiService.changePassword(documentNumber, payload).subscribe({
        next: () => {
          alert('✅ Contraseña actualizada correctamente');
          this.recoveryService.clearDocumentNumber();

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error al actualizar la contraseña');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  passwordsCoinciden(): boolean {
    return this.form.value.newPassword === this.form.value.confirmPassword;
  }
}

// ✅ Validador personalizado
export const passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('newPassword');
  const confirmPassword = form.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  const mismatch = password.value !== confirmPassword.value;

  if (mismatch) {
    confirmPassword.setErrors({ passwordMismatch: true });
  } else if (confirmPassword.hasError('passwordMismatch')) {
    confirmPassword.setErrors(null);
  }

  return mismatch ? { passwordMismatch: true } : null;
};