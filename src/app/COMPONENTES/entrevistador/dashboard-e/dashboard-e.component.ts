import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-e',
  templateUrl: './dashboard-e.component.html',
  styleUrls: ['./dashboard-e.component.css']
})
export class DashboardEComponent {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  cerrarSesion() {
    // Simplemente redirige a la página de inicio de sesión
    this.router.navigate(['/iniciar-sesion']);
  }

}
