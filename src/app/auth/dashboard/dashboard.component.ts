import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  menuAbierto = true;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    this.router.navigate(['/auth/login']);
  }

  //Mapa MapBox
  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.6811, 4.5339], // Armenia, Quindío
      zoom: 12,
      accessToken: 'pk.eyJ1Ijoic3RldmVuejAyIiwiYSI6ImNtOTNpbHA5MDBucGgyc3B3aGc3NGVjMTIifQ.sWpwCMBLsMpYLuT4MVQ4OA'
    });

     // Controles de navegación (zoom y rotación)
     map.addControl(new mapboxgl.NavigationControl(), 'top-right');

     // Control de ubicación del usuario
     map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }), 'top-right');
  }
}

