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
import { v4 as uuidv4 } from 'uuid';

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
  isEditing = false;
  reporteId: string | null = null;


  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      latitud: [null, Validators.required],
      longitud: [null, Validators.required],
      imagen: [null]
    });
  
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { reporte: any };
  
    if (state?.reporte) {
      this.isEditing = true;
      this.reporteId = state.reporte.id;
      this.form.patchValue(state.reporte);
    }
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
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ imagen: reader.result as string });
      };
      reader.readAsDataURL(file); // Esto convierte a base64
    }
  }
  
  

  onSubmit() {
    if (this.form.valid) {
      const reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
  
      if (this.isEditing && this.reporteId) {
        // Modo Edición
        const index = reportes.findIndex((r: any) => r.id === this.reporteId);
        if (index !== -1) {
          reportes[index] = { id: this.reporteId, estado: reportes[index].estado, ...this.form.value };
          alert('✏️ Reporte editado con éxito');
        }
      } else {
        // Modo Creación
        const nuevoReporte = {
          id: uuidv4(),
          estado: 'Pendiente', // Estado por defecto al crear
          ...this.form.value
        };
        reportes.push(nuevoReporte);
        alert('✅ Reporte creado con éxito');
      }
  
      localStorage.setItem('reportes', JSON.stringify(reportes));
      this.router.navigate(['/auth/reportes/lista']);
    } else {
      this.form.markAllAsTouched();
    }
  }  
  
  cancelar() {
    this.router.navigate(['/auth/reportes/lista']);
  }
}
