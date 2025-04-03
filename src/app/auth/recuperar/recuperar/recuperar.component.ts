import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      identificacion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const identificacion = this.form.value.identificacion;
      console.log('Identificación enviada:', identificacion);
      // Aquí iría la validación con backend

      // Simulación de éxito
      this.router.navigate(['/auth/restablecer']);
    }
  }
}

