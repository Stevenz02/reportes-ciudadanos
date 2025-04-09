import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CallApiServiceService } from '../../../call-api-service.service';
import { RecoveryService } from '../../../services/recovery.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [CallApiServiceService],
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private apiService: CallApiServiceService,
    private recoveryService: RecoveryService
  ) {
    this.form = this.fb.group({
      documentNumber: ['', Validators.required]
    });
  }

  //Vuelve al login
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    if (this.form.valid) {
      const documentNumber = this.form.value.documentNumber;

      // Opcional: Verificar existencia del usuario (si quieres)
      this.apiService.getUserByDocumentNumber(documentNumber).subscribe({
        next: (user) => {
          this.recoveryService.setDocumentNumber(documentNumber);
          this.router.navigate(['/auth/restablecer']);
        },
        error: () => {
          alert('❌ Usuario no encontrado');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}