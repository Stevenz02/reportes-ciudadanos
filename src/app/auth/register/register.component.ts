import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder, FormGroup, Validators,
  ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
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

  // Datos por país (ciudades e indicativo)
  datosPorPais: {
    [key: string]: {
      ciudades: string[],
      indicativo: string
    }
  } = {
    'Colombia': { ciudades: ['Armenia', 'Bogotá', 'Medellín'], indicativo: '+57' },
    'México': { ciudades: ['CDMX', 'Guadalajara', 'Monterrey'], indicativo: '+52' },
    'Estados Unidos': { ciudades: ['New York', 'Los Angeles', 'Chicago'], indicativo: '+1' }
  };

  paises = Object.keys(this.datosPorPais);
  ciudades: string[] = [];

  // Datos para fecha de nacimiento
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  dias = Array.from({ length: 31 }, (_, i) => i + 1);
  anios = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  constructor(private fb: FormBuilder, private router: Router) {
    // Construcción del formulario con validaciones
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
    }, { validators: passwordMatchValidator });
  }
  
  //Vuelve al login
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  // Al cambiar país, se actualizan las ciudades e indicativo
  onPaisChange(event: any) {
    const paisSeleccionado = event.value;
    const datos = this.datosPorPais[paisSeleccionado];

    this.ciudades = datos?.ciudades || [];
    this.registerForm.get('ciudad')?.reset();
    this.registerForm.get('indicativo')?.setValue(datos?.indicativo || '');
  }

  // Enviar formulario si es válido
  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
  
      // Guarda los datos del usuario actual
      localStorage.setItem('usuarioActual', JSON.stringify(userData));
  
      console.log('✅ Registro guardado en localStorage:', userData);
  
      // Redirige al login después del registro
      this.router.navigate(['/auth/login']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }  
}

// Validador para asegurar que las contraseñas coincidan
export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmarPassword')?.value;
  return password && confirm && password !== confirm
    ? { passwordMismatch: true }
    : null;
};
