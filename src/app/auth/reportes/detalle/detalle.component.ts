import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {
  reporte: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.reporte = navigation?.extras.state?.['reporte'];
  }

  volver() {
    this.router.navigate(['/auth/reportes/lista']);
  }
}

