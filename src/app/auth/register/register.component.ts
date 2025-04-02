import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  // Listas para selects
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  dias = Array.from({ length: 31 }, (_, i) => i + 1);
  anios = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  paises = ['Colombia'];
  ciudades = ['Armenia', 'Bogotá', 'Medellín'];
  indicativos = ['+57', '+1', '+52'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      mesNacimiento: ['', Validators.required],
      diaNacimiento: ['', Validators.required],
      anioNacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      indicativo: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Datos del formulario:', this.registerForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}

