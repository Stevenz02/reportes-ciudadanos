import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent {
  form!: FormGroup;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      latitud: [null, Validators.required],
      longitud: [null, Validators.required],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.6811, 4.5339], // Armenia
      zoom: 12,
      accessToken: 'pk.eyJ1Ijoic3RldmVuejAyIiwiYSI6ImNtOTNpbHA5MDBucGgyc3B3aGc3NGVjMTIifQ.sWpwCMBLsMpYLuT4MVQ4OA'
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    this.marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(this.map.getCenter())
      .addTo(this.map);

    this.updateFormLocation(this.map.getCenter());

    this.marker.on('dragend', () => {
      const lngLat = this.marker.getLngLat();
      this.updateFormLocation(lngLat);
    });
  }

  updateFormLocation(coords: mapboxgl.LngLat) {
    this.form.patchValue({
      latitud: coords.lat,
      longitud: coords.lng
    });
  }

  ubicacionAutomatica() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = [position.coords.longitude, position.coords.latitude] as [number, number];
        this.map.flyTo({ center: coords, zoom: 14 });
        this.marker.setLngLat(coords);
        this.updateFormLocation(new mapboxgl.LngLat(coords[0], coords[1]));
      });
    } else {
      alert('Geolocalización no soportada por tu navegador.');
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      this.form.patchValue({ imagen: file });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Reporte enviado:', this.form.value);
      alert('¡Reporte creado exitosamente!');
      this.router.navigate(['/auth/reportes/lista']);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/auth/reportes/lista']);
  }
}
