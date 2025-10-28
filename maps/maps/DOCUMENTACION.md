# 🗺️ DOCUMENTACIÓN DEL PROYECTO: MAPA INTERACTIVO DE ESPAÑA

## 📁 ESTRUCTURA DEL PROYECTO

```
src/app/
├── features/map/
│   ├── map.component.ts        # Componente principal del mapa
│   ├── map.component.html      # Template HTML con interfaz
│   └── map.component.css       # Estilos del componente
├── core/
│   ├── places.service.ts       # Servicio de gestión de lugares
│   └── maps.service.ts         # Servicio para el mapa Leaflet
└── models/
    └── place.model.ts          # Modelos de datos TypeScript
```

## 🎯 FUNCIONALIDADES PRINCIPALES

### 1. **BÚSQUEDA INTELIGENTE**
- **Archivo**: `places.service.ts` - método `searchPlaces()`
- **Funciona con**: Nombres, ciudades, direcciones, descripciones
- **Ejemplos**: "Madrid", "Burgos", "restaurante", "Alhambra"
- **Algoritmo**: Búsqueda insensible a mayúsculas con extracto de ciudades

### 2. **BASE DE DATOS MASIVA**
- **Más de 350 lugares** distribuidos por toda España
- **4 categorías**: Restaurantes, Alojamientos, Gasolineras, Lugares Turísticos
- **Cobertura nacional**: Todas las comunidades autónomas
- **Ubicaciones**: Ciudades, pueblos, carreteras, zonas rurales

### 3. **MAPA INTERACTIVO**
- **Tecnología**: Leaflet + OpenStreetMap
- **Marcadores personalizados** por categoría
- **Zoom automático** a resultados
- **Leyenda dinámica** con colores

### 4. **PLANIFICADOR DE RUTAS**
- **Origen → Destino**: Calcula lugares en el trayecto
- **Radio configurable**: 10km, 25km, 50km, 100km
- **Búsqueda inteligente** en ciudades intermedias
- **Modos**: Normal y Rutas

### 5. **FILTRADO AVANZADO**
- **Chips interactivos** por categoría
- **Colores personalizados**:
  - 🍽️ Restaurantes: Naranja (#FF5722)
  - ⛽ Gasolineras: Azul (#2196F3)
  - 🏨 Alojamientos: Verde (#4CAF50)
  - 🏛️ Turísticos: Morado (#9C27B0)

### 6. **GALERÍA DE IMÁGENES**
- **Solo lugares turísticos** muestran imágenes
- **Clic en imagen** abre modal
- **Carga lazy** para mejor rendimiento
- **URLs de Unsplash** para imágenes de calidad

## 💻 ARQUITECTURA TÉCNICA

### **COMPONENTE PRINCIPAL (map.component.ts)**

#### **Propiedades Principales:**
```typescript
places: Place[] = [];                    // Todos los lugares
filteredPlaces: Place[] = [];            // Lugares filtrados
selectedCategories: PlaceCategory[] = []; // Filtros activos
searchQuery: string = '';                // Texto de búsqueda
```

#### **Propiedades de Rutas:**
```typescript
isRouteMode: boolean = false;            // Modo ruta activo
routeOrigin: string = '';                // Ciudad origen
routeDestination: string = '';           // Ciudad destino
searchRadius: number = 25;               // Radio en km
```

#### **Métodos Principales:**
- `ngOnInit()`: Carga inicial de datos
- `onSearch()`: Ejecuta búsquedas
- `onCategoryToggle()`: Filtros por categoría
- `calculateRoute()`: Planifica rutas
- `updateMarkers()`: Actualiza marcadores del mapa

### **SERVICIO DE LUGARES (places.service.ts)**

#### **Método de Búsqueda Avanzada:**
```typescript
searchPlaces(query: string): Observable<Place[]> {
  // Extrae ciudad de la dirección
  // Busca en nombres, direcciones y descripciones
  // Soporte para sinónimos y variaciones
  // Búsqueda insensible a acentos y mayúsculas
}
```

#### **Base de Datos:**
- **351+ lugares** definidos estáticamente
- **Información completa**: coordenadas, teléfonos, ratings
- **Imágenes para turismo**: URLs de alta calidad
- **Cobertura geográfica**: Nacional completa

### **TEMPLATE HTML (map.component.html)**

#### **Estructura:**
1. **Panel Superior**: Búsqueda + Rutas + Filtros
2. **Contenido Principal**: Mapa + Lista
3. **Componentes Interactivos**: Chips, botones, formularios

#### **Directivas Angular Utilizadas:**
- `*ngFor`: Iteración de listas
- `*ngIf`: Renderizado condicional
- `[(ngModel)]`: Enlace bidireccional
- `(click)`: Eventos de clic
- `[style]`: Estilos dinámicos
- `[class]`: Classes condicionales

## 🎨 DISEÑO Y UX

### **Material Design:**
- **Angular Material 19**: Componentes consistentes
- **Iconografía**: Material Icons
- **Colores**: Palette personalizada por categorías
- **Responsive**: Adaptable a móviles

### **Experiencia de Usuario:**
- **Búsqueda intuitiva**: Resultados en tiempo real
- **Feedback visual**: Chips activos, lugares seleccionados
- **Navegación fluida**: Zoom automático, marcadores claros
- **Información completa**: Detalles, imágenes, contacto

## 🔧 TECNOLOGÍAS UTILIZADAS

- **Framework**: Angular 19 (Standalone Components)
- **UI**: Angular Material 19
- **Mapas**: Leaflet + OpenStreetMap
- **Estilos**: CSS3 + Flexbox + Grid
- **TypeScript**: Tipado fuerte
- **RxJS**: Programación reactiva

## 📊 ESTADÍSTICAS DEL PROYECTO

- **Líneas de código**: ~2500 líneas
- **Componentes**: 1 principal
- **Servicios**: 2 especializados
- **Lugares**: 351+ ubicaciones
- **Ciudades cubiertas**: 50+ ciudades principales
- **Provincias**: Todas (52 provincias)
- **Imágenes**: 100+ fotos de lugares turísticos

## 🚀 FUNCIONALIDADES FUTURAS

1. **Geolocalización**: Detectar ubicación actual
2. **Rutas GPS**: Integración con navegadores
3. **Favoritos**: Guardar lugares preferidos
4. **Reviews**: Sistema de reseñas
5. **Filtros avanzados**: Precio, horarios, servicios
6. **Modo offline**: Caché de datos
7. **Compartir**: Enlaces directos a lugares
8. **API real**: Conectar con servicios externos

---

**Creado con ❤️ usando Angular 19 + TypeScript + Material Design**
