import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CallApiServiceService } from '../../call-api-service.service'; // ✅ Importa tu servicio

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [CallApiServiceService],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  form!: FormGroup;
  usuarioActual: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: CallApiServiceService // ✅ Inyecta el servicio de API
  ) {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');

    this.form = this.fb.group({
      email: [this.usuarioActual?.email || '', [Validators.required, Validators.email]],
      phone: [this.usuarioActual?.phone || '', Validators.required],
      address: [this.usuarioActual?.address || '', Validators.required],
      residenceCity: [this.usuarioActual?.residenceCity || '', Validators.required]
    });
  }

  guardarCambios() {
    if (this.form.valid) {
      const datosActualizados = this.form.value;

      this.apiService.actualizarUsuario(this.usuarioActual.id, datosActualizados).subscribe({
        next: (response: any) => {
          this.snackBar.open('✅ Perfil actualizado con éxito', 'Aceptar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          // ✅ Actualiza localStorage si quieres tener los datos actualizados
          const nuevoUsuarioActual = {
            ...this.usuarioActual,
            ...datosActualizados
          };
          localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuarioActual));

          this.router.navigate(['/auth/dashboard']);
        },
        error: (error: any) => {
          console.error('Error al actualizar el perfil', error);
          this.snackBar.open('❌ Error al actualizar el perfil', 'Aceptar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  eliminarCuenta() {
    const confirmacion = confirm('⚠️ ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmacion) {
      localStorage.removeItem('usuarioActual');
      localStorage.removeItem('reportes'); // Opcional, si quieres eliminar los reportes también
      this.snackBar.open('🗑️ Cuenta eliminada con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
      this.router.navigate(['/auth/login']);
    }
  }
}