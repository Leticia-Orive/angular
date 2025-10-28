import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private map!: L.Map;
  private markers: L.Marker[] = [];

  constructor() {}

  initializeMap(mapElement: HTMLElement): L.Map {
    // Centrar en España
    this.map = L.map(mapElement, {
      center: [40.0, -4.0], // Centro geográfico de España
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    return this.map;
  }

  addMarker(
    lat: number,
    lng: number,
    title: string,
    icon?: string,
    color?: string
  ): L.Marker {
    const customIcon = L.divIcon({
      html: `<div class="custom-marker" style="background-color: ${color || '#FF0000'}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
               <span class="material-icons" style="font-size: 16px;">${icon || 'place'}</span>
             </div>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const marker = L.marker([lat, lng], {
      icon: customIcon,
      title: title
    }).addTo(this.map);

    // Añadir popup con información
    marker.bindPopup(`<strong>${title}</strong>`);

    this.markers.push(marker);
    return marker;
  }

  clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }

  fitBounds(bounds: L.LatLngBounds): void {
    this.map.fitBounds(bounds);
  }

  getMap(): L.Map {
    return this.map;
  }

  // Método auxiliar para crear bounds desde array de coordenadas
  createBounds(coordinates: Array<{lat: number, lng: number}>): L.LatLngBounds {
    const latLngs: L.LatLngTuple[] = coordinates.map(coord => [coord.lat, coord.lng]);
    return L.latLngBounds(latLngs);
  }
}
