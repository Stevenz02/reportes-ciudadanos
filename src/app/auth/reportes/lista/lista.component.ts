import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {
  reportes: any[] = [];

  constructor(private router: Router) {
    this.cargarReportes();
  }

  cargarReportes() {
    this.reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
  }

  editarReporte(reporte: any) {
    this.router.navigate(['/auth/reportes/crear'], { state: { reporte } });
  }  

  verDetalle(reporte: any) {
    this.router.navigate(['/auth/reportes/detalle'], { state: { reporte } });
  }

  eliminarReporte(reporteId: string) {
    this.reportes = this.reportes.filter(r => r.id !== reporteId);
    localStorage.setItem('reportes', JSON.stringify(this.reportes));
    alert('🗑️ Reporte eliminado con éxito');
    this.cargarReportes();
  }
  
  volverDashboard() {
    this.router.navigate(['/auth/dashboard']);
  }
  
}


