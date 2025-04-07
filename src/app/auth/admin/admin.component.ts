import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  reportes: any[] = [];

  constructor(private router: Router) {
    this.cargarReportes();
  }

  cargarReportes() {
    this.reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
  }

  cambiarEstado(reporte: any, nuevoEstado: string) {
    const index = this.reportes.findIndex(r => r.id === reporte.id);
    if (index !== -1) {
      this.reportes[index].estado = nuevoEstado;
      localStorage.setItem('reportes', JSON.stringify(this.reportes));
      alert(`🔔 Estado del reporte actualizado a "${nuevoEstado}"`);
      this.cargarReportes();
    }
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