import { Component } from '@angular/core';
import { MapComponent } from './features/map/map.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mapa Interactivo de España';
}
