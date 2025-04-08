import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CallApiServiceService } from '../../call-api-service.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false; // 🚀 Loading para el botón

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private apiService: CallApiServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.cargarDatosPrueba();
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToRecuperar() {
    this.router.navigate(['/auth/recuperar']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
  
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
  
      this.apiService.login(loginData).subscribe({
        next: (response: any) => {
          console.log('✅ Login exitoso:', response);
          console.log('🟢 Token recibido:', response.token); // Aquí ves tu token
        
          // Opcionalmente lo puedes guardar en localStorage
          localStorage.setItem('token', response.token);
          this.isLoading = false;
  
          // ✅ Opcional: guardar el token en localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuarioActual', JSON.stringify(response));
  
          this.mostrarSnackBar('✅ Inicio de sesión exitoso', 'success');
  
          // ✅ Redirigir según tipo de usuario si tienes roles
          this.router.navigate(['/auth/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.mostrarSnackBar('❌ Usuario o contraseña incorrectos', 'error');
          console.error('Error al iniciar sesión:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }  
  
  mostrarSnackBar(mensaje: string, tipo: 'success' | 'error') {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 3000,
      panelClass: tipo === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
  // 👇 Agrega este método dentro de tu clase LoginComponent
  cargarDatosPrueba() {
    // Verificar si ya existen datos
    const reportesExistentes = localStorage.getItem('reportes');
  
    // Solo cargar datos de prueba si no existen
    if (!reportesExistentes) {
      // Precargar reportes de prueba
      const reportes = [
        {
          id: "rep-1",
          titulo: "Accidente en la calle 12",
          categoria: "Accidente",
          descripcion: "Un accidente de tránsito con varios vehículos involucrados.",
          latitud: 4.5339,
          longitud: -75.6811,
          imagen: "",
          estado: "Pendiente",
          usuarioId: "1004916715"
        },
        {
          id: "rep-2",
          titulo: "Emergencia médica en el parque",
          categoria: "Emergencia",
          descripcion: "Persona herida esperando ambulancia.",
          latitud: 4.5335,
          longitud: -75.6800,
          imagen: "",
          estado: "Pendiente",
          usuarioId: "1004916715"
        }
      ];
  
      localStorage.setItem('reportes', JSON.stringify(reportes));
  
      console.log('Datos de prueba cargados correctamente.');
    } else {
      console.log('Datos existentes detectados. No se cargaron datos de prueba.');
    }
  }  
}


