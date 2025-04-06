import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
    this.form = this.fb.group({
      nombre: [usuarioActual?.nombre || '', Validators.required],
      correo: [usuarioActual?.correo || '', [Validators.required, Validators.email]],
      telefono: [usuarioActual?.telefono || '']
    });
  }
  

  guardarCambios() {
    if (this.form.valid) {
      localStorage.setItem('usuarioActual', JSON.stringify(this.form.value));
      this.snackBar.open('✅ Perfil actualizado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });      
      this.router.navigate(['/auth/dashboard']);
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

