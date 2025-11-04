import { Injectable } from '@angular/core';
import * as L from 'leaflet';

// Interfaces para datos de ruta
export interface RouteInfo {
  distance: number;      // Distancia en kilómetros
  duration: number;      // Duración en minutos
  coordinates: L.LatLng[]; // Coordenadas de la ruta
  instructions: string[]; // Instrucciones de navegación
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private routes: L.Polyline[] = []; // Array para almacenar líneas de ruta

  constructor() {}

  initializeMap(mapElement: HTMLElement): L.Map {
    console.log('🗺️ MapsService: Inicializando mapa de Leaflet...');
    console.log('📍 Elemento HTML recibido:', mapElement);
    console.log('📍 Dimensiones del elemento:', {
      width: mapElement.offsetWidth,
      height: mapElement.offsetHeight,
      clientWidth: mapElement.clientWidth,
      clientHeight: mapElement.clientHeight
    });

    try {
      // Centrar en España
      this.map = L.map(mapElement, {
        center: [40.0, -4.0], // Centro geográfico de España
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: true
      });

      console.log('✅ Mapa de Leaflet creado');

      // Añadir capa de OpenStreetMap
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      console.log('✅ Capa de tiles añadida');

      // Forzar el redimensionamiento del mapa después de un breve retraso
      setTimeout(() => {
        this.map.invalidateSize();
        console.log('🔄 Mapa redimensionado');
      }, 100);

      return this.map;
    } catch (error) {
      console.error('❌ Error creando el mapa de Leaflet:', error);
      throw error;
    }
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

  /**
   * CENTRAR MAPA EN UNA UBICACIÓN ESPECÍFICA
   * @param lat - Latitud del lugar
   * @param lng - Longitud del lugar
   * @param zoom - Nivel de zoom (opcional, por defecto 16)
   */
  centerMapOnLocation(lat: number, lng: number, zoom: number = 16): void {
    this.map.setView([lat, lng], zoom, {
      animate: true,
      duration: 1.0 // Animación suave de 1 segundo
    });
  }

  getMap(): L.Map {
    return this.map;
  }

  // Método auxiliar para crear bounds desde array de coordenadas
  createBounds(coordinates: Array<{lat: number, lng: number}>): L.LatLngBounds {
    const latLngs: L.LatLngTuple[] = coordinates.map(coord => [coord.lat, coord.lng]);
    return L.latLngBounds(latLngs);
  }

  /**
   * CALCULAR RUTA ENTRE DOS PUNTOS
   * Utiliza OpenRouteService API para obtener rutas reales
   */
  async calculateRoute(origin: string, destination: string): Promise<RouteInfo[]> {
    try {
      // Primero geocodificar las direcciones para obtener coordenadas
      const originCoords = await this.geocodeAddress(origin);
      const destCoords = await this.geocodeAddress(destination);

      if (!originCoords || !destCoords) {
        throw new Error('No se pudieron encontrar las coordenadas');
      }

      // Calcular múltiples rutas (rápida, corta, recomendada)
      const routes = await this.getMultipleRoutes(originCoords, destCoords);
      return routes;

    } catch (error) {
      console.error('Error calculando ruta:', error);
      // Devolver ruta simulada si hay error
      return this.createSimulatedRoute(origin, destination);
    }
  }

  /**
   * GEOCODIFICAR DIRECCIÓN
   * Convertir nombre de ciudad a coordenadas
   */
  private async geocodeAddress(address: string): Promise<L.LatLng | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}, España&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        return new L.LatLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
      }
    } catch (error) {
      console.error('Error geocodificando:', error);
    }

    return null;
  }

  /**
   * OBTENER MÚLTIPLES RUTAS
   * Solicita diferentes tipos de rutas (rápida, corta, etc.)
   */
  private async getMultipleRoutes(origin: L.LatLng, destination: L.LatLng): Promise<RouteInfo[]> {
    const profiles = [
      { name: 'driving-car', label: 'Ruta Rápida (Coche)' },
      { name: 'driving-hgv', label: 'Ruta para Camiones' }
    ];

    const routes: RouteInfo[] = [];

    for (const profile of profiles) {
      try {
        // Usar OpenRouteService API (gratis con límites)
        const url = `https://api.openrouteservice.org/v2/directions/${profile.name}?` +
          `api_key=5b3ce3597851110001cf6248cdd89eab413543b3b5e6c2b526c8b0cb&` +
          `start=${origin.lng},${origin.lat}&` +
          `end=${destination.lng},${destination.lat}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const feature = data.features[0];
          const coords = feature.geometry.coordinates.map((coord: number[]) =>
            new L.LatLng(coord[1], coord[0])
          );

          routes.push({
            distance: Math.round(feature.properties.segments[0].distance / 1000), // km
            duration: Math.round(feature.properties.segments[0].duration / 60), // minutos
            coordinates: coords,
            instructions: [profile.label]
          });
        }
      } catch (error) {
        console.error(`Error obteniendo ruta ${profile.name}:`, error);
      }
    }

    // Si no hay rutas de la API, crear ruta simulada
    if (routes.length === 0) {
      routes.push(...this.createSimulatedRoute(
        `${origin.lat},${origin.lng}`,
        `${destination.lat},${destination.lng}`
      ));
    }

    return routes;
  }

  /**
   * CREAR RUTA SIMULADA
   * Fallback cuando la API no está disponible
   */
  private createSimulatedRoute(origin: string, destination: string): RouteInfo[] {
    // Coordenadas aproximadas de ciudades principales de España
    const cityCoords: { [key: string]: L.LatLng } = {
      'madrid': new L.LatLng(40.4168, -3.7038),
      'barcelona': new L.LatLng(41.3851, 2.1734),
      'sevilla': new L.LatLng(37.3891, -5.9845),
      'valencia': new L.LatLng(39.4699, -0.3763),
      'bilbao': new L.LatLng(43.2627, -2.9253),
      'burgos': new L.LatLng(42.3404, -3.7036),
      'cordoba': new L.LatLng(37.8882, -4.7794),
      'granada': new L.LatLng(37.1773, -3.5986)
    };

    const originCoord = cityCoords[origin.toLowerCase()] || new L.LatLng(40.4168, -3.7038);
    const destCoord = cityCoords[destination.toLowerCase()] || new L.LatLng(41.3851, 2.1734);

    // Calcular distancia aproximada
    const distance = Math.round(originCoord.distanceTo(destCoord) / 1000);

    // Simular diferentes rutas
    return [
      {
        distance: distance,
        duration: Math.round(distance * 0.8), // ~80 km/h promedio
        coordinates: [originCoord, destCoord],
        instructions: [`Ruta Directa: ${origin} → ${destination}`]
      },
      {
        distance: Math.round(distance * 1.2),
        duration: Math.round(distance * 1.1), // Ruta más larga pero más rápida
        coordinates: [originCoord, destCoord],
        instructions: [`Ruta por Autopista: ${origin} → ${destination}`]
      }
    ];
  }

  /**
   * DIBUJAR RUTAS EN EL MAPA
   */
  drawRoutes(routes: RouteInfo[]): void {
    // Limpiar rutas existentes
    this.clearRoutes();

    const colors = ['#FF4444', '#4444FF', '#44FF44', '#FFAA00'];

    routes.forEach((route, index) => {
      const color = colors[index % colors.length];

      const polyline = L.polyline(route.coordinates, {
        color: color,
        weight: 6,
        opacity: 0.7
      }).addTo(this.map);

      // Popup con información de la ruta
      const popupContent = `
        <div>
          <strong>Ruta ${index + 1}</strong><br>
          <b>Distancia:</b> ${route.distance} km<br>
          <b>Tiempo:</b> ${Math.floor(route.duration / 60)}h ${route.duration % 60}min<br>
          <b>Velocidad promedio:</b> ${Math.round(route.distance / (route.duration / 60))} km/h
        </div>
      `;

      polyline.bindPopup(popupContent);
      this.routes.push(polyline);
    });

    // Ajustar vista para mostrar todas las rutas
    if (routes.length > 0) {
      const allCoords = routes.flatMap(route => route.coordinates);
      const bounds = L.latLngBounds(allCoords);
      this.map.fitBounds(bounds, { padding: [20, 20] });
    }
  }

  /**
   * LIMPIAR RUTAS DEL MAPA
   */
  clearRoutes(): void {
    this.routes.forEach(route => this.map.removeLayer(route));
    this.routes = [];
  }

  /**
   * AÑADIR MARCADORES DE ORIGEN Y DESTINO
   */
  addRouteMarkers(origin: L.LatLng, destination: L.LatLng, originName: string, destName: string): void {
    // Marcador de origen (verde)
    const originMarker = L.marker(origin, {
      icon: L.divIcon({
        html: `<div style="background: #4CAF50; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">
                 <span class="material-icons" style="font-size: 20px;">my_location</span>
               </div>`,
        className: 'origin-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })
    }).addTo(this.map);

    originMarker.bindPopup(`<strong>Origen:</strong> ${originName}`);

    // Marcador de destino (rojo)
    const destMarker = L.marker(destination, {
      icon: L.divIcon({
        html: `<div style="background: #F44336; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">
                 <span class="material-icons" style="font-size: 20px;">flag</span>
               </div>`,
        className: 'destination-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })
    }).addTo(this.map);

    destMarker.bindPopup(`<strong>Destino:</strong> ${destName}`);

    // Añadir a la lista de marcadores para poder limpiarlos
    this.markers.push(originMarker, destMarker);
  }
}
