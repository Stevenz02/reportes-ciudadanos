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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CallApiServiceService } from '../../call-api-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;

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

  constructor(private fb: FormBuilder,private service: CallApiServiceService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      documentNumber: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      country: ['', Validators.required],
      residenceCity: ['', Validators.required],
      address: ['', Validators.required],
      indicativo: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onPaisChange(event: any) {
    const paisSeleccionado = event.value;
    const datos = this.datosPorPais[paisSeleccionado];

    this.ciudades = datos?.ciudades || [];
    this.registerForm.get('residenceCity')?.reset();
    this.registerForm.get('indicativo')?.setValue(datos?.indicativo || '');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
  
      this.service.crearUsuario(userData).subscribe({
        next: (response) => {
          console.log('✅ Registro exitoso:', response);
          alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('❌ Error al registrar el usuario:', error);
          alert('❌ Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente.');
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }  
}

// Validador personalizado para las contraseñas
export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmarPassword')?.value;
  return password && confirm && password !== confirm
    ? { passwordMismatch: true }
    : null;
};
