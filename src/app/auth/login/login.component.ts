import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false; // 🚀 Loading para el botón

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
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
  
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const correoIngresado = this.loginForm.value.correo;
      const passwordIngresado = this.loginForm.value.contrasena;
  
      // ✅ Buscar usuario por correo y contraseña
      const usuarioEncontrado = usuarios.find((usuario: any) =>
        usuario.correo === correoIngresado && usuario.password === passwordIngresado
      );
  
      setTimeout(() => {
        if (usuarioEncontrado) {
          // ✅ Guardamos en localStorage como usuario actual
          localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
  
          this.mostrarSnackBar('✅ Inicio de sesión exitoso', 'success');
  
          // ✅ Si es admin, lo llevamos a la vista admin
          if (usuarioEncontrado.correo === 'admin@gmail.com') {
            this.router.navigate(['/auth/admin']);
          } else {
            this.router.navigate(['/auth/dashboard']);
          }
  
        } else {
          this.mostrarSnackBar('❌ Usuario o contraseña incorrectos', 'error');
        }
  
        this.isLoading = false;
  
      }, 800);
  
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
  // Precargar usuarios (incluyendo admin)
  const usuarios = [
    {
      nombre: "Steven Morales",
      tipoIdentificacion: "CC",
      identificacion: "1004916715",
      mesNacimiento: "Mayo",
      diaNacimiento: 30,
      anioNacimiento: 2002,
      pais: "Colombia",
      ciudad: "Armenia",
      direccion: "CRA 20 31-55",
      indicativo: "+57",
      telefono: "3013031360",
      correo: "steven@gmail.com",
      password: "12345678",
      confirmarPassword: "12345678",
      rol: "usuario"
    },
    {
      nombre: "Admin",
      tipoIdentificacion: "CC",
      identificacion: "1234567890",
      mesNacimiento: "Enero",
      diaNacimiento: 1,
      anioNacimiento: 1990,
      pais: "Colombia",
      ciudad: "Bogotá",
      direccion: "Admin street 123",
      indicativo: "+57",
      telefono: "3000000000",
      correo: "admin@gmail.com",
      password: "admin123",
      confirmarPassword: "admin123",
      rol: "admin"
    }
  ];

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

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

  // Limpiamos usuario actual para que la demo arranque limpio
  localStorage.removeItem('usuarioActual');
}

}


