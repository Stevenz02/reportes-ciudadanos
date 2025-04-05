import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent {
  form!: FormGroup;
  success = false;
  isEditing = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { reporte: any };

    if (state?.reporte) {
      this.isEditing = true;
      this.form.patchValue(state.reporte);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
      if (this.isEditing) {
        // Editar reporte existente
        const updatedReportes = reportes.map((r: any) =>
          r.titulo === this.form.value.titulo ? this.form.value : r
        );
        localStorage.setItem('reportes', JSON.stringify(updatedReportes));
        alert('✏️ Reporte editado con éxito');
      } else {
        // Crear nuevo reporte
        reportes.push(this.form.value);
        localStorage.setItem('reportes', JSON.stringify(reportes));
        alert('✅ Reporte creado con éxito');
      }

      this.success = true;

      setTimeout(() => {
        this.success = false;
        this.router.navigate(['/auth/reportes/lista']);
      }, 1500);
    } else {
      this.form.markAllAsTouched();
    }
  }
}


