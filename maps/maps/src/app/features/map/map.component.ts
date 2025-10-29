// Importaciones de Angular Core
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material para la interfaz de usuario
import { MatButtonModule } from '@angular/material/button';      // Botones Material Design
import { MatIconModule } from '@angular/material/icon';          // Iconos Material
import { MatChipsModule } from '@angular/material/chips';        // Chips para filtros de categoría
import { MatInputModule } from '@angular/material/input';        // Campos de entrada de texto
import { MatFormFieldModule } from '@angular/material/form-field'; // Contenedores de formularios
import { MatSelectModule } from '@angular/material/select';      // Selectores desplegables
import { MatCardModule } from '@angular/material/card';          // Tarjetas para contenido
import { FormsModule } from '@angular/forms';                    // Para ngModel y formularios

// Servicios personalizados de la aplicación
import { MapsService, RouteInfo } from '../../core/maps.service'; // Servicio para manejo del mapa Leaflet
import { PlacesService } from '../../core/places.service';       // Servicio para gestión de lugares
import { Place, PlaceCategory, PlaceCategoryConfig } from '../../models/place.model'; // Modelos de datos

/**
 * COMPONENTE PRINCIPAL DEL MAPA INTERACTIVO
 *
 * Este componente maneja toda la funcionalidad del mapa de España:
 * - Visualización del mapa con Leaflet
 * - Búsqueda y filtrado de lugares
 * - Gestión de marcadores en el mapa
 * - Planificación de rutas (origen → destino)
 * - Visualización de información detallada de lugares
 */
@Component({
  selector: 'app-map',
  standalone: true,  // Componente independiente (Angular 17+)
  imports: [
    CommonModule,        // Directivas básicas (*ngFor, *ngIf, etc.)
    MatButtonModule,     // Botones de Material Design
    MatIconModule,       // Iconos de Material Design
    MatChipsModule,      // Chips para filtros de categoría
    MatInputModule,      // Campos de texto
    MatFormFieldModule,  // Contenedores de formularios
    MatSelectModule,     // Selectores desplegables
    MatCardModule,       // Tarjetas para organizar contenido
    FormsModule          // Para enlace de datos bidireccional
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  // REFERENCIA AL ELEMENTO HTML DEL MAPA
  // Obtiene referencia al div donde se renderiza el mapa de Leaflet
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  // ===== PROPIEDADES PRINCIPALES =====

  // Almacena todos los lugares cargados desde el servicio
  places: Place[] = [];

  // Lugares que se muestran actualmente (después de filtros y búsqueda)
  filteredPlaces: Place[] = [];

  // Categorías seleccionadas para el filtrado (restaurantes, hoteles, etc.)
  selectedCategories: PlaceCategory[] = [];

  // Configuración de categorías (colores, iconos, etiquetas)
  categoryConfigs: PlaceCategoryConfig[] = [];

  // Texto de búsqueda introducido por el usuario
  searchQuery: string = '';

  // Lugar seleccionado actualmente (para mostrar detalles)
  selectedPlace: Place | null = null;

  // ===== PROPIEDADES PARA FUNCIONALIDAD DE RUTAS =====

  // Indica si está activo el modo de planificación de rutas
  isRouteMode: boolean = false;

  // Indica si se ha calculado una ruta exitosamente
  isRouteCalculated: boolean = false;

  // Ciudad/dirección de origen para la ruta
  routeOrigin: string = '';

  // Ciudad/dirección de destino para la ruta
  routeDestination: string = '';

  // Radio de búsqueda en kilómetros para lugares en la ruta
  searchRadius: number = 25;

  // Lugares encontrados en el trayecto de la ruta
  routePlaces: Place[] = [];

  // Información de las rutas calculadas
  calculatedRoutes: RouteInfo[] = [];

  // Ruta seleccionada actualmente
  selectedRouteIndex: number = 0;

  // Referencia a Math para el template
  Math = Math;

  /**
   * CONSTRUCTOR - Inyección de dependencias
   * @param mapsService - Servicio para manejo del mapa Leaflet
   * @param placesService - Servicio para gestión de lugares y búsquedas
   */
  constructor(
    private mapsService: MapsService,
    private placesService: PlacesService
  ) {}

  /**
   * INICIALIZACIÓN DEL COMPONENTE
   * Se ejecuta cuando Angular crea el componente
   * Carga la configuración inicial y todos los lugares
   */
  ngOnInit(): void {
    // Obtener configuración de categorías (colores, iconos, etiquetas)
    this.categoryConfigs = this.placesService.getCategoryConfigs();

    // Por defecto, mostrar todas las categorías seleccionadas
    this.selectedCategories = this.categoryConfigs.map(config => config.key);

    // Cargar todos los lugares desde el servicio
    this.placesService.getPlaces().subscribe(places => {
      this.places = places;           // Guardar lista completa
      this.filteredPlaces = places;   // Mostrar todos inicialmente
    });
  }

  /**
   * POST-INICIALIZACIÓN DEL COMPONENTE
   * Se ejecuta después de que Angular inicialice las vistas
   * Necesario para acceder a elementos del DOM como #mapContainer
   */
  ngAfterViewInit(): void {
    this.initializeMap();
  }

  /**
   * INICIALIZAR EL MAPA DE LEAFLET
   * Crea el mapa en el elemento HTML y añade los marcadores iniciales
   */
  private initializeMap(): void {
    if (this.mapContainer?.nativeElement) {
      // Crear el mapa de Leaflet en el elemento HTML
      this.mapsService.initializeMap(this.mapContainer.nativeElement);
      // Añadir todos los marcadores iniciales
      this.updateMarkers();
    }
  }

  /**
   * ALTERNAR FILTRO DE CATEGORÍA
   * Maneja el clic en los chips de categorías (restaurantes, hoteles, etc.)
   * @param category - Categoría a activar/desactivar
   */
  onCategoryToggle(category: PlaceCategory): void {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      // Si está seleccionada, la quitamos del filtro
      this.selectedCategories.splice(index, 1);
    } else {
      // Si no está seleccionada, la añadimos al filtro
      this.selectedCategories.push(category);
    }
    // Actualizar lugares mostrados según nuevos filtros
    this.filterPlaces();
  }

  /**
   * REALIZAR BÚSQUEDA DE LUGARES
   * Se ejecuta cuando el usuario hace clic en "Buscar" o presiona Enter
   * Busca por nombre, dirección, ciudad o descripción
   */
  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Buscar lugares que coincidan con el texto introducido
      this.placesService.searchPlaces(this.searchQuery).subscribe(places => {
        // Aplicar también los filtros de categoría activos
        this.filteredPlaces = places.filter(place =>
          this.selectedCategories.includes(place.category)
        );
        // Actualizar marcadores en el mapa
        this.updateMarkers();
      });
    } else {
      // Si no hay texto de búsqueda, mostrar solo filtros de categoría
      this.filterPlaces();
    }
  }

  /**
   * FILTRAR LUGARES POR CATEGORÍAS SELECCIONADAS
   * Método privado que filtra la lista completa según las categorías activas
   */
  private filterPlaces(): void {
    this.filteredPlaces = this.places.filter(place =>
      this.selectedCategories.includes(place.category)
    );
    this.updateMarkers();
  }

  /**
   * ACTUALIZAR MARCADORES EN EL MAPA
   * Método privado que redibuja todos los marcadores según los lugares filtrados
   */
  private updateMarkers(): void {
    // Limpiar todos los marcadores existentes del mapa
    this.mapsService.clearMarkers();

    // Añadir un marcador por cada lugar filtrado
    this.filteredPlaces.forEach(place => {
      const config = this.getCategoryConfig(place.category);
      this.mapsService.addMarker(
        place.location.lat,     // Latitud del lugar
        place.location.lng,     // Longitud del lugar
        place.name,             // Nombre que aparece en el popup
        config?.icon,           // Icono según categoría
        config?.color           // Color según categoría
      );
    });

    // Ajustar automáticamente el zoom para mostrar todos los marcadores
    if (this.filteredPlaces.length > 0) {
      const coordinates = this.filteredPlaces.map(place => place.location);
      const bounds = this.mapsService.createBounds(coordinates);
      this.mapsService.fitBounds(bounds);
    }
  }

  /**
   * VERIFICAR SI UNA CATEGORÍA ESTÁ SELECCIONADA
   * Método helper para el template HTML
   * @param category - Categoría a verificar
   * @returns true si la categoría está activa en los filtros
   */
  isCategorySelected(category: PlaceCategory): boolean {
    return this.selectedCategories.includes(category);
  }

  /**
   * OBTENER CONFIGURACIÓN DE UNA CATEGORÍA
   * Método helper que devuelve color, icono y etiqueta de una categoría
   * @param category - Categoría de la que obtener configuración
   * @returns Configuración de la categoría (color, icono, label)
   */
  getCategoryConfig(category: PlaceCategory): PlaceCategoryConfig | undefined {
    return this.placesService.getCategoryConfig(category);
  }

  /**
   * SELECCIONAR UN LUGAR ESPECÍFICO
   * Se ejecuta cuando el usuario hace clic en un lugar de la lista
   * @param place - Lugar seleccionado
   */
  selectPlace(place: Place): void {
    this.selectedPlace = place;
    // TODO: Centrar el mapa en el lugar seleccionado
    console.log('Lugar seleccionado:', place.name);
  }

  /**
   * ABRIR IMAGEN EN MODAL
   * Se ejecuta cuando el usuario hace clic en una imagen de lugar turístico
   * @param imageUrl - URL de la imagen a mostrar
   * @param placeName - Nombre del lugar (para el título)
   */
  openImageModal(imageUrl: string, placeName: string): void {
    // Abrir imagen en nueva ventana
    window.open(imageUrl, '_blank', 'width=800,height=600');
  }

  /**
   * LIMPIAR BÚSQUEDA
   * Borra el texto de búsqueda y vuelve a mostrar todos los lugares filtrados
   */
  clearSearch(): void {
    this.searchQuery = '';
    this.filterPlaces();
  }

  // ======= MÉTODOS DE RUTA =======

  /**
   * ACTIVAR MODO DE PLANIFICACIÓN DE RUTAS
   * Cambia la interfaz para mostrar controles de origen/destino
   */
  enableRouteMode(): void {
    this.isRouteMode = true;
    this.isRouteCalculated = false;
    this.routeOrigin = '';
    this.routeDestination = '';
  }

  /**
   * DESACTIVAR MODO DE RUTAS
   * Vuelve al modo normal y limpia los datos de ruta
   */
  disableRouteMode(): void {
    this.isRouteMode = false;
    this.isRouteCalculated = false;
    this.routeOrigin = '';
    this.routeDestination = '';
    this.routePlaces = [];
    this.calculatedRoutes = [];
    this.selectedRouteIndex = 0;

    // Limpiar rutas del mapa
    this.mapsService.clearRoutes();

    // Volver a mostrar todos los lugares normalmente
    this.filterPlaces();
  }

  /**
   * CALCULAR RUTA ENTRE DOS PUNTOS
   * Utiliza el servicio de mapas para calcular rutas reales y dibujar líneas
   */
  async calculateRoute(): Promise<void> {
    if (!this.routeOrigin.trim() || !this.routeDestination.trim()) {
      return; // No hacer nada si faltan origen o destino
    }

    console.log(`🗺️ Calculando ruta de ${this.routeOrigin} a ${this.routeDestination}`);

    try {
      // Limpiar marcadores de lugares para mostrar solo la ruta
      this.mapsService.clearMarkers();
      this.mapsService.clearRoutes();

      // Calcular rutas reales usando el servicio
      const routes = await this.mapsService.calculateRoute(this.routeOrigin, this.routeDestination);

      if (routes && routes.length > 0) {
        // Dibujar las rutas en el mapa
        this.mapsService.drawRoutes(routes);

        // Añadir marcadores de origen y destino
        if (routes[0].coordinates.length >= 2) {
          this.mapsService.addRouteMarkers(
            routes[0].coordinates[0],
            routes[0].coordinates[routes[0].coordinates.length - 1],
            this.routeOrigin,
            this.routeDestination
          );
        }

        // Mostrar información de las rutas
        this.displayRouteInfo(routes);

        // Marcar que la ruta ha sido calculada
        this.isRouteCalculated = true;

        // Buscar lugares de interés en el trayecto
        this.findPlacesAlongRoute();

        console.log(`✅ ${routes.length} rutas calculadas exitosamente`);
      } else {
        console.error('❌ No se pudieron calcular rutas');
      }

    } catch (error) {
      console.error('Error calculando ruta:', error);
      // Fallback a método anterior si hay error
      this.isRouteCalculated = true;
      this.findPlacesAlongRoute();
    }
  }

  private findPlacesAlongRoute(): void {
    // Buscar lugares que contengan las ciudades de origen o destino
    // o que estén geográficamente cerca del trayecto
    const originLower = this.routeOrigin.toLowerCase().trim();
    const destinationLower = this.routeDestination.toLowerCase().trim();

    this.routePlaces = this.places.filter(place => {
      const addressLower = place.address.toLowerCase();
      const nameLower = place.name.toLowerCase();

      // Buscar lugares en las ciudades de origen y destino
      const isInOrigin = addressLower.includes(originLower) || nameLower.includes(originLower);
      const isInDestination = addressLower.includes(destinationLower) || nameLower.includes(destinationLower);

      // También buscar en ciudades intermedias comunes
      const isInRoute = this.isPlaceInRoute(place, originLower, destinationLower);

      return isInOrigin || isInDestination || isInRoute;
    });

    // Aplicar filtros de categoría
    this.filteredPlaces = this.routePlaces.filter(place =>
      this.selectedCategories.includes(place.category)
    );

    this.updateMarkers();

    console.log(`📍 Encontrados ${this.filteredPlaces.length} lugares en tu ruta`);
  }

  private isPlaceInRoute(place: Place, origin: string, destination: string): boolean {
    const address = place.address.toLowerCase();

    // Rutas principales de España
    const routeMapping: { [key: string]: string[] } = {
      // Madrid como hub central
      'madrid-barcelona': ['zaragoza', 'lleida', 'guadalajara'],
      'madrid-sevilla': ['córdoba', 'ciudad real', 'valdepeñas'],
      'madrid-valencia': ['cuenca', 'albacete'],
      'madrid-bilbao': ['burgos', 'vitoria', 'miranda de ebro'],
      'madrid-a coruña': ['león', 'astorga', 'lugo'],
      'madrid-lisboa': ['toledo', 'cáceres', 'badajoz'],

      // Otras rutas importantes
      'barcelona-sevilla': ['zaragoza', 'madrid', 'córdoba'],
      'barcelona-valencia': ['tarragona', 'castellón'],
      'sevilla-bilbao': ['madrid', 'burgos'],
      'valencia-a coruña': ['madrid', 'león'],
    };

    // Crear clave de ruta (ambas direcciones)
    const routeKey1 = `${origin}-${destination}`;
    const routeKey2 = `${destination}-${origin}`;

    const intermediateCities = routeMapping[routeKey1] || routeMapping[routeKey2] || [];

    return intermediateCities.some(city => address.includes(city));
  }

  /**
   * MOSTRAR INFORMACIÓN DE LAS RUTAS CALCULADAS
   * Almacena y muestra los datos de tiempo y distancia
   */
  displayRouteInfo(routes: RouteInfo[]): void {
    this.calculatedRoutes = routes;
    this.selectedRouteIndex = 0; // Seleccionar la primera ruta por defecto

    // Mostrar información en consola
    routes.forEach((route, index) => {
      const hours = Math.floor(route.duration / 60);
      const minutes = route.duration % 60;
      console.log(`🛣️ Ruta ${index + 1}: ${route.distance}km - ${hours}h ${minutes}min`);
    });
  }

  /**
   * SELECCIONAR UNA RUTA ESPECÍFICA
   * Permite al usuario elegir entre diferentes opciones de ruta
   */
  selectRoute(routeIndex: number): void {
    if (routeIndex >= 0 && routeIndex < this.calculatedRoutes.length) {
      this.selectedRouteIndex = routeIndex;

      // Redescar la ruta seleccionada con diferente estilo
      this.mapsService.clearRoutes();
      const selectedRoute = [this.calculatedRoutes[routeIndex]];
      this.mapsService.drawRoutes(selectedRoute);

      console.log(`✅ Seleccionada ruta ${routeIndex + 1}`);
    }
  }

  /**
   * OBTENER RUTA SELECCIONADA ACTUALMENTE
   */
  getSelectedRoute(): RouteInfo | null {
    return this.calculatedRoutes[this.selectedRouteIndex] || null;
  }

  updateRouteResults(): void {
    if (this.isRouteCalculated) {
      this.findPlacesAlongRoute();
    }
  }
}
