import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Place, PlaceCategory, PlaceCategoryConfig } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private readonly categoryConfigs: PlaceCategoryConfig[] = [
    {
      key: PlaceCategory.RESTAURANT,
      label: 'Restaurantes',
      icon: 'restaurant',
      color: '#FF5722'
    },
    {
      key: PlaceCategory.GAS_STATION,
      label: 'Gasolineras',
      icon: 'local_gas_station',
      color: '#2196F3'
    },
    {
      key: PlaceCategory.ACCOMMODATION,
      label: 'Alojamientos',
      icon: 'hotel',
      color: '#4CAF50'
    },
    {
      key: PlaceCategory.TOURIST_ATTRACTION,
      label: 'Lugares Turísticos',
      icon: 'place',
      color: '#9C27B0'
    }
  ];

  private readonly mockPlaces: Place[] = [
    // ======= RESTAURANTES =======

    // Madrid y Comunidad de Madrid
    {
      id: '1',
      name: 'Restaurante Sobrino de Botín',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 40.4157, lng: -3.7074 },
      address: 'Calle de los Cuchilleros, 17, Madrid',
      phone: '+34 913 66 42 17',
      rating: 4.2,
      description: 'El restaurante más antiguo del mundo según el Libro Guinness de los Récords'
    },
    {
      id: '2',
      name: 'Casa Lucio',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 40.4125, lng: -3.7077 },
      address: 'Cava Baja, 35, Madrid',
      phone: '+34 913 65 32 52',
      rating: 4.3,
      description: 'Famoso por sus huevos rotos, restaurante tradicional madrileño'
    },
    {
      id: '3',
      name: 'El Club Allard',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 40.4198, lng: -3.7038 },
      address: 'C. de Ferraz, 2, Madrid',
      phone: '+34 915 59 09 39',
      rating: 4.8,
      description: 'Restaurante con estrella Michelin, alta cocina creativa'
    },

    // Barcelona y Cataluña
    {
      id: '4',
      name: 'Cal Pep',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 41.3833, lng: 2.1834 },
      address: 'Plaça de les Olles, 8, Barcelona',
      phone: '+34 933 10 79 61',
      rating: 4.5,
      description: 'Tapas tradicionales catalanas en el Barrio Gótico'
    },
    {
      id: '5',
      name: 'Disfrutar',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 41.3912, lng: 2.1649 },
      address: 'C. de Villarroel, 163, Barcelona',
      phone: '+34 933 48 68 96',
      rating: 4.9,
      description: 'Restaurante con 3 estrellas Michelin, vanguardia culinaria'
    },
    {
      id: '6',
      name: 'Can Culleretes',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 41.3802, lng: 2.1734 },
      address: 'C. d\'En Quintana, 5, Barcelona',
      phone: '+34 933 17 30 22',
      rating: 4.1,
      description: 'Restaurante más antiguo de Barcelona, fundado en 1786'
    },

    // Valencia y Comunidad Valenciana
    {
      id: '7',
      name: 'La Pepica',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 39.4584, lng: -0.3312 },
      address: 'Passeig de Neptú, 6, Valencia',
      phone: '+34 963 71 03 66',
      rating: 4.2,
      description: 'Cuna de la paella valenciana desde 1898'
    },
    {
      id: '8',
      name: 'Casa Roberto',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 39.4734, lng: -0.3778 },
      address: 'C. del Mestre Gozalbo, 19, Valencia',
      phone: '+34 963 95 25 61',
      rating: 4.4,
      description: 'Auténtica paella valenciana en ambiente tradicional'
    },

    // Sevilla y Andalucía
    {
      id: '9',
      name: 'Eslava',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 37.3891, lng: -5.9845 },
      address: 'C. Eslava, 3, Sevilla',
      phone: '+34 954 90 65 68',
      rating: 4.3,
      description: 'Tapas innovadoras en el corazón de Sevilla'
    },
    {
      id: '10',
      name: 'El Rinconcillo',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 37.3978, lng: -5.9964 },
      address: 'C. Gerona, 40, Sevilla',
      phone: '+34 954 22 31 83',
      rating: 4.0,
      description: 'El bar más antiguo de Sevilla, fundado en 1670'
    },

    // Bilbao y País Vasco
    {
      id: '11',
      name: 'Azurmendi',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.2804, lng: -2.8909 },
      address: 'Barrio Legina, s/n, Larrabetzu, Vizcaya',
      phone: '+34 944 55 88 59',
      rating: 4.9,
      description: 'Restaurante con 3 estrellas Michelin de Eneko Atxa'
    },
    {
      id: '12',
      name: 'Casa Rufo',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.2627, lng: -2.9253 },
      address: 'C. Hurtado de Amézaga, 5, Bilbao',
      phone: '+34 944 43 21 72',
      rating: 4.2,
      description: 'Cocina vasca tradicional desde 1908'
    },

    // Santiago de Compostela y Galicia
    {
      id: '13',
      name: 'Casa Marcelo',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.8805, lng: -8.5456 },
      address: 'R. das Hortas, 1, Santiago de Compostela',
      phone: '+34 981 55 85 80',
      rating: 4.6,
      description: 'Fusión gallego-asiática con estrella Michelin'
    },
    {
      id: '14',
      name: 'O Dezaseis',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.8782, lng: -8.5448 },
      address: 'R. de San Pedro, 16, Santiago de Compostela',
      phone: '+34 981 56 48 80',
      rating: 4.3,
      description: 'Mariscos y productos gallegos de primera calidad'
    },

    // Zaragoza y Aragón
    {
      id: '15',
      name: 'La Ontina',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 41.6488, lng: -0.8890 },
      address: 'C. de Predicadores, 7, Zaragoza',
      phone: '+34 976 29 76 34',
      rating: 4.1,
      description: 'Cocina aragonesa contemporánea'
    },

    // ======= GASOLINERAS =======

    // Madrid y alrededores
    {
      id: '16',
      name: 'Repsol - A1 Madrid Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 40.5488, lng: -3.6680 },
      address: 'Autopista A-1, Km 15, Madrid',
      phone: '+34 900 122 122',
      description: 'Estación de servicio con tienda y restaurante'
    },
    {
      id: '17',
      name: 'Cepsa - M-30 Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 40.3723, lng: -3.6291 },
      address: 'M-30, Salida 18, Madrid',
      phone: '+34 902 242 424',
      description: 'Gasolinera con lavado automático'
    },
    {
      id: '18',
      name: 'BP - A-6 Villalba',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 40.6339, lng: -4.0026 },
      address: 'A-6, Km 39, Collado Villalba',
      phone: '+34 918 50 12 34',
      description: 'Estación con servicios 24h'
    },

    // Barcelona y Cataluña
    {
      id: '19',
      name: 'Repsol - AP-7 Barcelona',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 41.2971, lng: 2.0833 },
      address: 'AP-7, Km 154, Martorell',
      phone: '+34 900 122 122',
      description: 'Área de servicio completa'
    },
    {
      id: '20',
      name: 'Galp - Diagonal Barcelona',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 41.3977, lng: 2.1504 },
      address: 'Avda. Diagonal, 440, Barcelona',
      phone: '+34 934 16 78 90',
      description: 'Gasolinera urbana con tienda'
    },

    // Valencia
    {
      id: '21',
      name: 'Cepsa - Valencia Centro',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 39.4699, lng: -0.3763 },
      address: 'Av. del Puerto, 145, Valencia',
      phone: '+34 902 242 424',
      description: 'Gasolinera con servicios adicionales'
    },
    {
      id: '22',
      name: 'Shell - A-7 Valencia Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 39.4021, lng: -0.3570 },
      address: 'A-7, Km 362, Valencia',
      phone: '+34 963 49 87 65',
      description: 'Estación con restaurante y tienda'
    },

    // Sevilla y Andalucía
    {
      id: '23',
      name: 'Repsol - A-4 Sevilla Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 37.4532, lng: -5.9104 },
      address: 'A-4, Km 534, Sevilla',
      phone: '+34 900 122 122',
      description: 'Área de servicio con múltiples opciones'
    },
    {
      id: '24',
      name: 'Cepsa - Córdoba Centro',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 37.8965, lng: -4.7688 },
      address: 'Av. de América, 23, Córdoba',
      phone: '+34 902 242 424',
      description: 'Gasolinera urbana 24h'
    },

    // Bilbao y País Vasco
    {
      id: '25',
      name: 'Petronor - A-8 Bilbao',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.3038, lng: -3.0761 },
      address: 'A-8, Km 10, Bilbao',
      phone: '+34 944 91 23 45',
      description: 'Gasolinera con productos locales'
    },

    // Galicia
    {
      id: '26',
      name: 'Galp - A Coruña',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.3713, lng: -8.3960 },
      address: 'Av. de Arteixo, 150, A Coruña',
      phone: '+34 981 12 34 56',
      description: 'Estación con lavado y tienda'
    },

    // ======= ALOJAMIENTOS =======

    // Madrid
    {
      id: '27',
      name: 'Hotel Ritz Madrid',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 40.4165, lng: -3.6948 },
      address: 'Plaza de la Lealtad, 5, Madrid',
      phone: '+34 917 01 67 67',
      rating: 4.8,
      description: 'Hotel de lujo en el centro de Madrid'
    },
    {
      id: '28',
      name: 'Hotel Villa Magna',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 40.4260, lng: -3.6868 },
      address: 'Paseo de la Castellana, 22, Madrid',
      phone: '+34 915 87 12 34',
      rating: 4.7,
      description: 'Elegancia y sofisticación en pleno centro'
    },
    {
      id: '29',
      name: 'Hotel Palacio de los Duques',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 40.4190, lng: -3.7085 },
      address: 'C. de Cuesta de Santo Domingo, 5, Madrid',
      phone: '+34 914 54 44 40',
      rating: 4.6,
      description: 'Hotel boutique junto al Palacio Real'
    },

    // Barcelona
    {
      id: '30',
      name: 'Hotel Casa Fuster',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 41.4036, lng: 2.1540 },
      address: 'Passeig de Gràcia, 132, Barcelona',
      phone: '+34 932 55 30 00',
      rating: 4.6,
      description: 'Hotel modernista en Passeig de Gràcia'
    },
    {
      id: '31',
      name: 'Hotel Arts Barcelona',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 41.3867, lng: 2.1965 },
      address: 'C. de la Marina, 19-21, Barcelona',
      phone: '+34 932 21 10 00',
      rating: 4.8,
      description: 'Rascacielos de lujo frente al mar'
    },
    {
      id: '32',
      name: 'Hotel Majestic',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 41.3921, lng: 2.1658 },
      address: 'Passeig de Gràcia, 68, Barcelona',
      phone: '+34 934 88 17 17',
      rating: 4.5,
      description: 'Clásico hotel en el corazón de Barcelona'
    },

    // Valencia
    {
      id: '33',
      name: 'Hotel Las Arenas Balneario Resort',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.4625, lng: -0.3320 },
      address: 'C. d\'Eugènia Viñes, 22-24, Valencia',
      phone: '+34 963 12 06 00',
      rating: 4.7,
      description: 'Resort de lujo frente a la playa'
    },
    {
      id: '34',
      name: 'Hotel Caro',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.4753, lng: -0.3774 },
      address: 'C. d\'Almirall, 14, Valencia',
      phone: '+34 963 05 42 00',
      rating: 4.4,
      description: 'Hotel boutique en el casco histórico'
    },

    // Sevilla
    {
      id: '35',
      name: 'Hotel Alfonso XIII',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 37.3847, lng: -5.9918 },
      address: 'C. San Fernando, 2, Sevilla',
      phone: '+34 954 91 70 00',
      rating: 4.9,
      description: 'Palacio histórico de lujo, icono de Sevilla'
    },
    {
      id: '36',
      name: 'Hotel Casa 1800 Sevilla',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 37.3890, lng: -5.9934 },
      address: 'C. Rodrigo Caro, 6, Sevilla',
      phone: '+34 954 56 18 00',
      rating: 4.6,
      description: 'Hotel boutique en mansion del siglo XIX'
    },

    // Bilbao
    {
      id: '37',
      name: 'Hotel Carlton',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.2627, lng: -2.9253 },
      address: 'Plaza Federico Moyúa, 2, Bilbao',
      phone: '+34 944 16 22 00',
      rating: 4.5,
      description: 'Hotel histórico en el centro de Bilbao'
    },
    {
      id: '38',
      name: 'Hotel Silken Gran Domine',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.2688, lng: -2.9344 },
      address: 'C. Alameda Mazarredo, 61, Bilbao',
      phone: '+34 944 25 33 00',
      rating: 4.4,
      description: 'Vistas espectaculares al Guggenheim'
    },

    // Santiago de Compostela
    {
      id: '39',
      name: 'Parador de Santiago',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.8805, lng: -8.5447 },
      address: 'Plaza do Obradoiro, 1, Santiago de Compostela',
      phone: '+34 981 58 22 00',
      rating: 4.8,
      description: 'Parador en el histórico Hostal dos Reis Católicos'
    },

    // Granada
    {
      id: '40',
      name: 'Parador de Granada',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 37.1759, lng: -3.5888 },
      address: 'R. Real de la Alhambra, s/n, Granada',
      phone: '+34 958 22 14 40',
      rating: 4.7,
      description: 'Parador dentro del recinto de la Alhambra'
    },

    // ======= LUGARES TURÍSTICOS =======

    // Madrid
    {
      id: '41',
      name: 'Museo del Prado',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.4138, lng: -3.6921 },
      address: 'C. de Ruiz de Alarcón, 23, Madrid',
      phone: '+34 913 30 28 00',
      rating: 4.7,
      description: 'Una de las pinacotecas más importantes del mundo',
      images: [
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '42',
      name: 'Palacio Real de Madrid',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.4179, lng: -3.7142 },
      address: 'C. de Bailén, s/n, Madrid',
      phone: '+34 914 54 87 00',
      rating: 4.5,
      description: 'Residencia oficial de la Familia Real Española',
      images: [
        'https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565282298175-b0f858e30b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '43',
      name: 'Museo Reina Sofía',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.4077, lng: -3.6943 },
      address: 'C. de Santa Isabel, 52, Madrid',
      phone: '+34 917 74 10 00',
      rating: 4.4,
      description: 'Arte contemporáneo español, hogar del Guernica de Picasso',
      images: [
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '44',
      name: 'Parque del Retiro',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.4152, lng: -3.6844 },
      address: 'Plaza de la Independencia, 7, Madrid',
      phone: '+34 915 30 00 41',
      rating: 4.6,
      description: 'Pulmón verde de Madrid con 125 hectáreas',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '45',
      name: 'Templo de Debod',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.4240, lng: -3.7178 },
      address: 'C. de Ferraz, 1, Madrid',
      phone: '+34 913 66 74 15',
      rating: 4.2,
      description: 'Templo egipcio auténtico del siglo II a.C.',
      images: [
        'https://images.unsplash.com/photo-1555085922-2425ae1d6c60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },

    // Barcelona
    {
      id: '46',
      name: 'Sagrada Família',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.4036, lng: 2.1744 },
      address: 'C. de Mallorca, 401, Barcelona',
      phone: '+34 932 08 04 14',
      rating: 4.6,
      description: 'Basílica modernista de Antoni Gaudí, Patrimonio de la Humanidad. Obra maestra del modernismo catalán iniciada en 1882 y aún en construcción. Sus fachadas representan el Nacimiento, la Pasión y la Gloria de Cristo, con torres que alcanzan los 172m de altura y un interior que simula un bosque de piedra con increíbles juegos de luz.',
      images: [
        'https://images.unsplash.com/photo-1539650116574-75c0c6d6d0cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '47',
      name: 'Park Güell',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.4145, lng: 2.1527 },
      address: 'C. d\'Olot, s/n, Barcelona',
      phone: '+34 934 09 18 31',
      rating: 4.4,
      description: 'Parque público con arquitectura modernista de Gaudí. Patrimonio de la Humanidad con mosaicos de cerámica coloridos (trencadís), la famosa salamandra, el banco serpenteante y vistas panorámicas de Barcelona. Originalmente diseñado como urbanización residencial de lujo, hoy es uno de los parques más visitados del mundo.',
      images: [
        'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '48',
      name: 'Casa Batlló',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.3916, lng: 2.1649 },
      address: 'Passeig de Gràcia, 43, Barcelona',
      phone: '+34 932 16 03 06',
      rating: 4.5,
      description: 'Obra maestra del modernismo catalán de Antoni Gaudí. Casa señorial transformada (1904-1906) con fachada ondulante de mosaicos azules y verdes que imitan las escamas de un dragón, balcones en forma de máscaras venecianas y un tejado que simula el lomo del dragón. Interior con formas orgánicas, juegos de luz y vidrieras multicolores.',
      images: [
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565282298175-b0f858e30b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '49',
      name: 'La Pedrera (Casa Milà)',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.3954, lng: 2.1620 },
      address: 'Provença, 261-265, Barcelona',
      phone: '+34 902 20 21 38',
      rating: 4.4,
      description: 'Último edificio civil diseñado por Gaudí'
    },
    {
      id: '50',
      name: 'Barrio Gótico',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.3838, lng: 2.1761 },
      address: 'Barri Gòtic, Barcelona',
      phone: '+34 932 85 38 34',
      rating: 4.3,
      description: 'Centro histórico con arquitectura medieval'
    },

    // Sevilla
    {
      id: '51',
      name: 'Catedral de Sevilla y Giralda',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.3856, lng: -5.9931 },
      address: 'Av. de la Constitución, s/n, Sevilla',
      phone: '+34 954 21 49 71',
      rating: 4.7,
      description: 'Catedral gótica más grande del mundo'
    },
    {
      id: '52',
      name: 'Real Alcázar de Sevilla',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.3829, lng: -5.9931 },
      address: 'Patio de Banderas, s/n, Sevilla',
      phone: '+34 954 50 23 23',
      rating: 4.8,
      description: 'Palacio real en uso más antiguo de Europa. Patrimonio de la Humanidad que combina arte islámico, mudéjar y renacentista. Destacan el Salón de Embajadores con su cúpula dorada, los patios de las Doncellas y las Muñecas, y los jardines con naranjos, estanques y pabellones. Escenario de "Juego de Tronos" representando los Jardines de Agua de Dorne.',
      images: [
        'https://images.unsplash.com/photo-1539650116574-75c0c6d6d0cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '53',
      name: 'Plaza de España Sevilla',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.3772, lng: -5.9869 },
      address: 'Av. de Isabel la Católica, Sevilla',
      phone: '+34 955 47 32 32',
      rating: 4.6,
      description: 'Impresionante plaza construida para la Expo de 1929'
    },

    // Granada
    {
      id: '54',
      name: 'Alhambra',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.1760, lng: -3.5881 },
      address: 'C. Real de la Alhambra, s/n, Granada',
      phone: '+34 958 02 79 71',
      rating: 4.8,
      description: 'Conjunto palaciego nazarí y jardines del siglo XIII. Patrimonio de la Humanidad que combina los Palacios Nazaríes, la Alcazaba militar, el Palacio de Carlos V y los famosos jardines del Generalife. Ejemplo excepcional del arte islámico en Europa con sus intrincadas decoraciones en yeso, azulejería y juegos de agua.',
      images: [
        'https://images.unsplash.com/photo-1539650116574-75c0c6d6d0cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '55',
      name: 'Generalife',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.1791, lng: -3.5844 },
      address: 'C. Real de la Alhambra, s/n, Granada',
      phone: '+34 958 02 79 71',
      rating: 4.7,
      description: 'Jardines y villa de recreo de los reyes nazaríes'
    },

    // Córdoba
    {
      id: '56',
      name: 'Mezquita-Catedral de Córdoba',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.8789, lng: -4.7794 },
      address: 'C. Cardenal Herrero, 1, Córdoba',
      phone: '+34 957 47 05 12',
      rating: 4.7,
      description: 'Antigua mezquita convertida en catedral'
    },
    {
      id: '57',
      name: 'Alcázar de los Reyes Cristiano',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.8764, lng: -4.7833 },
      address: 'Plaza Campo Santo de los Mártires, s/n, Córdoba',
      phone: '+34 957 42 01 51',
      rating: 4.3,
      description: 'Fortaleza y palacio de los Reyes Católicos'
    },

    // Valencia
    {
      id: '58',
      name: 'Ciudad de las Artes y las Ciencias',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.4561, lng: -0.3507 },
      address: 'Av. del Professor López Piñero, 7, Valencia',
      phone: '+34 902 10 00 31',
      rating: 4.5,
      description: 'Complejo arquitectónico y cultural'
    },
    {
      id: '59',
      name: 'Mercado Central de Valencia',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.4742, lng: -0.3788 },
      address: 'Plaça de la Ciutat de Bruges, s/n, Valencia',
      phone: '+34 963 82 91 00',
      rating: 4.4,
      description: 'Mercado modernista con productos locales'
    },
    {
      id: '60',
      name: 'Catedral de Valencia',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.4755, lng: -0.3759 },
      address: 'Plaça de l\'Almoina, s/n, Valencia',
      phone: '+34 963 91 81 27',
      rating: 4.2,
      description: 'Catedral gótica con el Santo Cáliz'
    },

    // Bilbao
    {
      id: '61',
      name: 'Museo Guggenheim Bilbao',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.2687, lng: -2.9343 },
      address: 'Abandoibarra Etorb., 2, Bilbao',
      phone: '+34 944 35 90 00',
      rating: 4.6,
      description: 'Museo de arte contemporáneo con arquitectura icónica'
    },
    {
      id: '62',
      name: 'Casco Viejo Bilbao',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.2565, lng: -2.9234 },
      address: 'Casco Viejo, Bilbao',
      phone: '+34 944 79 57 60',
      rating: 4.3,
      description: 'Las Siete Calles del centro histórico'
    },

    // Santiago de Compostela
    {
      id: '63',
      name: 'Catedral de Santiago de Compostela',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.8805, lng: -8.5456 },
      address: 'Praza do Obradoiro, s/n, Santiago de Compostela',
      phone: '+34 981 58 35 48',
      rating: 4.8,
      description: 'Meta del Camino de Santiago'
    },
    {
      id: '64',
      name: 'Plaza del Obradoiro',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.8804, lng: -8.5447 },
      address: 'Praza do Obradoiro, Santiago de Compostela',
      phone: '+34 981 55 51 29',
      rating: 4.7,
      description: 'Plaza principal y corazón de Santiago'
    },

    // Toledo
    {
      id: '65',
      name: 'Catedral de Toledo',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.8581, lng: -4.0243 },
      address: 'C. del Cardenal Cisneros, 1, Toledo',
      phone: '+34 925 22 22 41',
      rating: 4.6,
      description: 'Catedral gótica con tesoros artísticos'
    },
    {
      id: '66',
      name: 'Alcázar de Toledo',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.8575, lng: -4.0208 },
      address: 'C. de la Union, s/n, Toledo',
      phone: '+34 925 23 88 00',
      rating: 4.4,
      description: 'Fortaleza que domina la ciudad'
    },

    // Salamanca
    {
      id: '67',
      name: 'Plaza Mayor de Salamanca',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.9651, lng: -5.6640 },
      address: 'Plaza Mayor, Salamanca',
      phone: '+34 923 21 83 42',
      rating: 4.7,
      description: 'Una de las plazas más bellas de España'
    },
    {
      id: '68',
      name: 'Universidad de Salamanca',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.9633, lng: -5.6692 },
      address: 'Patio de Escuelas, 1, Salamanca',
      phone: '+34 923 29 44 00',
      rating: 4.5,
      description: 'Universidad más antigua de España (1218)'
    },

    // Segovia
    {
      id: '69',
      name: 'Acueducto de Segovia',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.9481, lng: -4.1177 },
      address: 'Plaza del Azoguejo, 1, Segovia',
      phone: '+34 921 46 67 20',
      rating: 4.6,
      description: 'Acueducto romano del siglo I d.C.'
    },
    {
      id: '70',
      name: 'Alcázar de Segovia',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.9525, lng: -4.1313 },
      address: 'Plaza Reina Victoria Eugenia, s/n, Segovia',
      phone: '+34 921 46 07 59',
      rating: 4.5,
      description: 'Castillo que inspiró el de Blancanieves de Disney'
    },

    // ======= MÁS RESTAURANTES =======

    // Asturias
    {
      id: '71',
      name: 'Casa Marcial',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.4985, lng: -5.0671 },
      address: 'La Salgar, s/n, Arriondas, Asturias',
      phone: '+34 985 84 09 91',
      rating: 4.8,
      description: '2 Estrellas Michelin, cocina asturiana moderna'
    },
    {
      id: '72',
      name: 'Real Balneario de Salinas',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.5692, lng: -5.9287 },
      address: 'Av. Juan Sitges, 3, Salinas, Asturias',
      phone: '+34 985 51 86 13',
      rating: 4.3,
      description: 'Mariscos y pescados frescos con vistas al mar'
    },

    // Cantabria
    {
      id: '73',
      name: 'El Serbal',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.4623, lng: -3.8199 },
      address: 'C. de Andrés del Río, 7, Santander',
      phone: '+34 942 22 25 15',
      rating: 4.6,
      description: 'Estrella Michelin, cocina cántabra de autor'
    },

    // La Rioja
    {
      id: '74',
      name: 'Venta Moncalvillo',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.4672, lng: -2.6201 },
      address: 'Ctra. de Burgos, Km 15, Daroca de Rioja',
      phone: '+34 941 44 41 32',
      rating: 4.7,
      description: '2 Estrellas Michelin, cocina riojana de vanguardia'
    },

    // Navarra
    {
      id: '75',
      name: 'Maher',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.8169, lng: -1.6432 },
      address: 'C. de Estafeta, 4, Pamplona',
      phone: '+34 948 22 61 68',
      rating: 4.4,
      description: 'Estrella Michelin, cocina navarra contemporánea'
    },

    // Extremadura
    {
      id: '76',
      name: 'Atrio',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 39.4748, lng: -6.3702 },
      address: 'Av. de España, 30, Cáceres',
      phone: '+34 927 24 29 28',
      rating: 4.9,
      description: '2 Estrellas Michelin, cocina extremeña de lujo'
    },

    // Castilla-La Mancha
    {
      id: '77',
      name: 'El Doncel',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 40.9656, lng: -2.6351 },
      address: 'Paseo de la Estación, 30, Sigüenza, Guadalajara',
      phone: '+34 949 39 00 01',
      rating: 4.2,
      description: 'Cocina castellana en parador histórico'
    },

    // Murcia
    {
      id: '78',
      name: 'Cabaña Buenavista',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 37.9922, lng: -1.1307 },
      address: 'Barrio de Churra, s/n, Murcia',
      phone: '+34 968 84 50 69',
      rating: 4.5,
      description: 'Estrella Michelin, cocina murciana de autor'
    },

    // Islas Canarias
    {
      id: '79',
      name: 'M.B. (Martín Berasategui)',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 28.4682, lng: -16.3144 },
      address: 'Av. de Bruselas, s/n, Santa Cruz de Tenerife',
      phone: '+34 922 57 92 00',
      rating: 4.8,
      description: '2 Estrellas Michelin en Tenerife'
    },
    {
      id: '80',
      name: 'Poemas by Hermanos Padrón',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 28.1248, lng: -15.4391 },
      address: 'C. León y Castillo, 227, Las Palmas de Gran Canaria',
      phone: '+34 928 37 01 75',
      rating: 4.6,
      description: 'Estrella Michelin, cocina canaria moderna'
    },

    // Islas Baleares
    {
      id: '81',
      name: 'Es Racó d\'es Teix',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 39.6953, lng: 2.6346 },
      address: 'C. Sa Vinya Vella, 6, Deià, Mallorca',
      phone: '+34 971 63 95 01',
      rating: 4.7,
      description: 'Estrella Michelin con vistas espectaculares'
    },

    // ======= MÁS GASOLINERAS =======

    // Asturias
    {
      id: '82',
      name: 'Repsol - A-8 Oviedo',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.3614, lng: -5.8593 },
      address: 'A-8, Km 468, Oviedo',
      phone: '+34 900 122 122',
      description: 'Estación de servicio completa'
    },
    {
      id: '83',
      name: 'Cepsa - Gijón Puerto',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.5322, lng: -5.6611 },
      address: 'Av. del Llano, 23, Gijón',
      phone: '+34 902 242 424',
      description: 'Gasolinera urbana con tienda'
    },

    // Cantabria
    {
      id: '84',
      name: 'Shell - A-8 Santander',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.4623, lng: -3.8199 },
      address: 'A-8, Km 188, Santander',
      phone: '+34 942 12 34 56',
      description: 'Área de servicio con restaurante'
    },

    // La Rioja
    {
      id: '85',
      name: 'BP - Logroño Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.4627, lng: -2.4449 },
      address: 'AP-68, Km 13, Logroño',
      phone: '+34 941 23 45 67',
      description: 'Estación con servicios 24h'
    },

    // Navarra
    {
      id: '86',
      name: 'Repsol - Pamplona Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.8169, lng: -1.6432 },
      address: 'A-15, Km 78, Pamplona',
      phone: '+34 900 122 122',
      description: 'Área de descanso completa'
    },

    // Extremadura
    {
      id: '87',
      name: 'Cepsa - A-5 Mérida',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 38.9165, lng: -6.3432 },
      address: 'A-5, Km 341, Mérida',
      phone: '+34 902 242 424',
      description: 'Estación con múltiples servicios'
    },
    {
      id: '88',
      name: 'Galp - Cáceres Centro',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 39.4748, lng: -6.3702 },
      address: 'Av. de la Universidad, 45, Cáceres',
      phone: '+34 927 12 34 56',
      description: 'Gasolinera urbana moderna'
    },

    // Castilla-La Mancha
    {
      id: '89',
      name: 'Repsol - A-4 Ciudad Real',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 38.9848, lng: -3.9273 },
      address: 'A-4, Km 195, Ciudad Real',
      phone: '+34 900 122 122',
      description: 'Área de servicio La Mancha'
    },
    {
      id: '90',
      name: 'Shell - Albacete',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 38.9943, lng: -1.8585 },
      address: 'Av. de España, 67, Albacete',
      phone: '+34 967 23 45 67',
      description: 'Estación urbana con lavado'
    },

    // Murcia
    {
      id: '91',
      name: 'BP - Murcia Este',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 37.9922, lng: -1.1307 },
      address: 'A-30, Km 142, Murcia',
      phone: '+34 968 12 34 56',
      description: 'Área de servicio con restaurante'
    },
    {
      id: '92',
      name: 'Cepsa - Cartagena Puerto',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 37.6063, lng: -0.9861 },
      address: 'Av. de la Libertad, 23, Cartagena',
      phone: '+34 902 242 424',
      description: 'Gasolinera portuaria'
    },

    // Islas Canarias
    {
      id: '93',
      name: 'Disa - Las Palmas',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 28.1248, lng: -15.4391 },
      address: 'C. León y Castillo, 145, Las Palmas',
      phone: '+34 928 12 34 56',
      description: 'Red local canaria'
    },
    {
      id: '94',
      name: 'Cepsa - Santa Cruz Tenerife',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 28.4682, lng: -16.3144 },
      address: 'Av. Tres de Mayo, 67, Santa Cruz',
      phone: '+34 902 242 424',
      description: 'Estación insular completa'
    },

    // Islas Baleares
    {
      id: '95',
      name: 'Repsol - Palma Aeropuerto',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 39.5696, lng: 2.6502 },
      address: 'Ctra. del Aeropuerto, Km 7, Palma',
      phone: '+34 900 122 122',
      description: 'Estación aeroportuaria'
    },
    {
      id: '96',
      name: 'BP - Ibiza Puerto',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 38.9067, lng: 1.4205 },
      address: 'Av. de España, 12, Ibiza',
      phone: '+34 971 12 34 56',
      description: 'Gasolinera urbana en Ibiza'
    },

    // ======= MÁS ALOJAMIENTOS =======

    // Asturias
    {
      id: '97',
      name: 'Hotel de la Reconquista',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.3614, lng: -5.8593 },
      address: 'C. de Gil de Jaz, 16, Oviedo',
      phone: '+34 985 24 11 00',
      rating: 4.6,
      description: 'Palacio del siglo XVIII convertido en hotel de lujo'
    },
    {
      id: '98',
      name: 'Parador de Gijón',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.5322, lng: -5.6611 },
      address: 'Parque Isabel la Católica, s/n, Gijón',
      phone: '+34 985 37 05 11',
      rating: 4.4,
      description: 'Parador con vistas al mar Cantábrico'
    },

    // Cantabria
    {
      id: '99',
      name: 'Hotel Real',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.4623, lng: -3.8199 },
      address: 'Paseo de Pérez Galdós, 28, Santander',
      phone: '+34 942 27 25 50',
      rating: 4.5,
      description: 'Hotel histórico frente a la bahía'
    },
    {
      id: '100',
      name: 'Parador de Santillana del Mar',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.3886, lng: -4.1025 },
      address: 'Plaza Ramón Pelayo, 11, Santillana del Mar',
      phone: '+34 942 02 80 28',
      rating: 4.7,
      description: 'Parador en casa solariega del siglo XVII'
    },

    // La Rioja
    {
      id: '101',
      name: 'Hotel Marqués de Riscal',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.4979, lng: -2.6201 },
      address: 'C. Torrea, 1, Elciego, Álava',
      phone: '+34 945 18 08 80',
      rating: 4.8,
      description: 'Hotel diseñado por Frank Gehry en bodega histórica'
    },

    // Navarra
    {
      id: '102',
      name: 'Gran Hotel La Perla',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.8169, lng: -1.6432 },
      address: 'Plaza del Castillo, 1, Pamplona',
      phone: '+34 948 22 30 00',
      rating: 4.6,
      description: 'Hotel histórico en pleno centro de Pamplona'
    },

    // Extremadura
    {
      id: '103',
      name: 'Parador de Cáceres',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.4748, lng: -6.3702 },
      address: 'C. Ancha, 6, Cáceres',
      phone: '+34 927 21 17 59',
      rating: 4.5,
      description: 'Parador en palacio del siglo XIV'
    },
    {
      id: '104',
      name: 'Parador de Mérida',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 38.9165, lng: -6.3432 },
      address: 'Plaza de la Constitución, 3, Mérida',
      phone: '+34 924 31 38 00',
      rating: 4.4,
      description: 'Convento del siglo XVIII junto al teatro romano'
    },

    // Castilla-La Mancha
    {
      id: '105',
      name: 'Parador de Cuenca',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 40.0781, lng: -2.1370 },
      address: 'Subida de San Pablo, s/n, Cuenca',
      phone: '+34 969 23 23 20',
      rating: 4.6,
      description: 'Convento dominico del siglo XVI con vistas únicas'
    },
    {
      id: '106',
      name: 'Parador de Almagro',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 38.8889, lng: -3.7107 },
      address: 'Ronda de San Francisco, s/n, Almagro',
      phone: '+34 926 86 01 00',
      rating: 4.3,
      description: 'Convento franciscano del siglo XVI'
    },

    // Murcia
    {
      id: '107',
      name: 'Hotel Sercotel Los Habaneros',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 37.9922, lng: -1.1307 },
      address: 'C. de los Habaneros, 3, Murcia',
      phone: '+34 968 21 61 52',
      rating: 4.2,
      description: 'Hotel boutique en el centro histórico'
    },
    {
      id: '108',
      name: 'La Manga Club Resort',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 37.6397, lng: -0.7408 },
      address: 'Los Belones, Cartagena, Murcia',
      phone: '+34 968 33 12 34',
      rating: 4.7,
      description: 'Resort de lujo con golf y spa'
    },

    // Islas Canarias
    {
      id: '109',
      name: 'Hotel Santa Catalina',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 28.1248, lng: -15.4391 },
      address: 'C. León y Castillo, 227, Las Palmas',
      phone: '+34 928 24 30 40',
      rating: 4.8,
      description: 'Hotel colonial de lujo desde 1890'
    },
    {
      id: '110',
      name: 'Hotel Botanico',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 28.4158, lng: -16.5623 },
      address: 'Av. Richard J. Yeoward, 1, Puerto de la Cruz',
      phone: '+34 922 38 14 00',
      rating: 4.9,
      description: 'Resort de lujo con jardines orientales'
    },

    // Islas Baleares
    {
      id: '111',
      name: 'Hotel Son Vida',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.5696, lng: 2.6502 },
      address: 'C. Raixa, 2, Palma de Mallorca',
      phone: '+34 971 79 00 00',
      rating: 4.8,
      description: 'Castillo del siglo XIII convertido en resort'
    },
    {
      id: '112',
      name: 'Hotel Hacienda Na Xamena',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.0838, lng: 1.3828 },
      address: 'Na Xamena, s/n, San Miguel, Ibiza',
      phone: '+34 971 33 45 00',
      rating: 4.7,
      description: 'Resort de lujo en acantilados de Ibiza'
    },

    // ======= MÁS LUGARES TURÍSTICOS =======

    // Asturias
    {
      id: '113',
      name: 'Catedral de Oviedo',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.3614, lng: -5.8428 },
      address: 'Plaza Alfonso II el Casto, s/n, Oviedo',
      phone: '+34 985 22 10 33',
      rating: 4.5,
      description: 'Catedral gótica con la Cámara Santa'
    },
    {
      id: '114',
      name: 'Cuevas de Altamira',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.3778, lng: -4.1217 },
      address: 'Av. Marcelino Sanz de Sautuola, s/n, Santillana del Mar',
      phone: '+34 942 81 80 05',
      rating: 4.6,
      description: 'Capilla Sixtina del arte rupestre'
    },
    {
      id: '115',
      name: 'Picos de Europa',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.2415, lng: -4.8516 },
      address: 'Parque Nacional Picos de Europa',
      phone: '+34 985 84 86 14',
      rating: 4.8,
      description: 'Primer Parque Nacional de España. Impresionante macizo montañoso con picos de más de 2.600m, lagos glaciares, hayedos centenarios y una rica fauna que incluye osos pardos, lobos y rebecos. Ideal para senderismo, escalada y fotografía de naturaleza.',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '116',
      name: 'Covadonga',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.3067, lng: -5.0561 },
      address: 'Covadonga, Cangas de Onís, Asturias',
      phone: '+34 985 84 60 35',
      rating: 4.7,
      description: 'Santuario y cuna de la Reconquista'
    },

    // Cantabria
    {
      id: '117',
      name: 'Palacio de la Magdalena',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.4742, lng: -3.7859 },
      address: 'Av. de la Reina Victoria, s/n, Santander',
      phone: '+34 942 20 30 84',
      rating: 4.4,
      description: 'Palacio real de verano con vistas espectaculares'
    },
    {
      id: '118',
      name: 'Comillas (Capricho de Gaudí)',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.3886, lng: -4.2886 },
      address: 'Barrio de Sobrellano, s/n, Comillas',
      phone: '+34 942 72 03 65',
      rating: 4.5,
      description: 'Villa modernista de Antoni Gaudí'
    },

    // La Rioja
    {
      id: '119',
      name: 'Monasterio de San Millán',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.3204, lng: -2.8717 },
      address: 'San Millán de la Cogolla, La Rioja',
      phone: '+34 941 37 30 49',
      rating: 4.6,
      description: 'Cuna del castellano, Patrimonio de la Humanidad'
    },
    {
      id: '120',
      name: 'Bodegas Marqués de Riscal',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.4979, lng: -2.6201 },
      address: 'C. Torrea, 1, Elciego, Álava',
      phone: '+34 945 60 60 00',
      rating: 4.7,
      description: 'Bodega histórica con arquitectura de Gehry'
    },

    // Navarra
    {
      id: '121',
      name: 'Castillo de Olite',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.4788, lng: -1.6488 },
      address: 'Plaza de los Teobaldos, 1, Olite',
      phone: '+34 948 74 10 35',
      rating: 4.5,
      description: 'Palacio real de los Reyes de Navarra'
    },
    {
      id: '122',
      name: 'Catedral de Pamplona',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.8197, lng: -1.6456 },
      address: 'C. Dormitalería, 1, Pamplona',
      phone: '+34 948 21 25 94',
      rating: 4.3,
      description: 'Catedral gótica con claustro excepcional'
    },

    // Extremadura
    {
      id: '123',
      name: 'Teatro Romano de Mérida',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 38.9165, lng: -6.3377 },
      address: 'C. de José Ramón Mélida, s/n, Mérida',
      phone: '+34 924 00 49 08',
      rating: 4.7,
      description: 'Teatro romano mejor conservado del mundo'
    },
    {
      id: '124',
      name: 'Ciudad Monumental de Cáceres',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.4748, lng: -6.3720 },
      address: 'Plaza Mayor, s/n, Cáceres',
      phone: '+34 927 01 08 34',
      rating: 4.6,
      description: 'Ciudad medieval Patrimonio de la Humanidad'
    },
    {
      id: '125',
      name: 'Monasterio de Guadalupe',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.4524, lng: -5.3267 },
      address: 'Plaza de Santa María de Guadalupe, 1',
      phone: '+34 927 36 70 00',
      rating: 4.8,
      description: 'Monasterio mudéjar, centro de peregrinación'
    },

    // Castilla-La Mancha
    {
      id: '126',
      name: 'Casas Colgadas de Cuenca',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.0781, lng: -2.1313 },
      address: 'C. de los Canónigos, s/n, Cuenca',
      phone: '+34 969 23 21 19',
      rating: 4.5,
      description: 'Arquitectura popular única en Europa'
    },
    {
      id: '127',
      name: 'Molinos de Viento de La Mancha',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.3626, lng: -3.7178 },
      address: 'Campo de Criptana, Ciudad Real',
      phone: '+34 926 56 22 31',
      rating: 4.4,
      description: 'Molinos inmortalizados por Cervantes'
    },
    {
      id: '128',
      name: 'Ciudad Encantada',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.2341, lng: -2.0078 },
      address: 'Ctra. de la Ciudad Encantada, Km 20, Cuenca',
      phone: '+34 969 23 93 25',
      rating: 4.3,
      description: 'Formaciones rocosas espectaculares'
    },

    // Murcia
    {
      id: '129',
      name: 'Catedral de Murcia',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.9838, lng: -1.1265 },
      address: 'Plaza del Cardenal Belluga, s/n, Murcia',
      phone: '+34 968 21 63 44',
      rating: 4.4,
      description: 'Catedral barroca con torre renacentista'
    },
    {
      id: '130',
      name: 'Mar Menor',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.7331, lng: -0.7408 },
      address: 'La Manga del Mar Menor, Murcia',
      phone: '+34 968 14 71 29',
      rating: 4.2,
      description: 'Laguna salada más grande de Europa'
    },

    // Islas Canarias
    {
      id: '131',
      name: 'Parque Nacional del Teide',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 28.2722, lng: -16.6099 },
      address: 'Teide National Park, Tenerife',
      phone: '+34 922 29 01 29',
      rating: 4.8,
      description: 'Volcán más alto de España y tercer volcán más grande del mundo'
    },
    {
      id: '132',
      name: 'Cueva de los Verdes',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 29.1580, lng: -13.4358 },
      address: 'Ctra. de Órzola, Km 2, Lanzarote',
      phone: '+34 928 84 84 84',
      rating: 4.5,
      description: 'Sistema de cuevas volcánicas únicas'
    },
    {
      id: '133',
      name: 'Roque Nublo',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 28.0089, lng: -15.6089 },
      address: 'Tejeda, Gran Canaria',
      phone: '+34 928 66 61 02',
      rating: 4.6,
      description: 'Monumento natural emblemático de Gran Canaria'
    },
    {
      id: '134',
      name: 'Garajonay (La Gomera)',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 28.1167, lng: -17.2333 },
      address: 'Parque Nacional de Garajonay, La Gomera',
      phone: '+34 922 80 09 93',
      rating: 4.7,
      description: 'Bosque de laurisilva, Patrimonio de la Humanidad'
    },

    // Islas Baleares
    {
      id: '135',
      name: 'Catedral de Palma (La Seu)',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.5663, lng: 2.6263 },
      address: 'Plaça de l\'Almoina, s/n, Palma',
      phone: '+34 971 71 31 33',
      rating: 4.6,
      description: 'Catedral gótica levantina junto al mar'
    },
    {
      id: '136',
      name: 'Dalt Vila (Ibiza)',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 38.9067, lng: 1.4330 },
      address: 'Dalt Vila, Ibiza',
      phone: '+34 971 39 92 32',
      rating: 4.4,
      description: 'Ciudad alta fortificada, Patrimonio de la Humanidad'
    },
    {
      id: '137',
      name: 'Cala Mondragó',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 39.3567, lng: 3.1817 },
      address: 'Parc Natural de Mondragó, Mallorca',
      phone: '+34 971 18 15 22',
      rating: 4.5,
      description: 'Parque natural con calas vírgenes'
    },

    // Aragón - Más lugares
    {
      id: '138',
      name: 'Basílica del Pilar',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.6561, lng: -0.8779 },
      address: 'Plaza del Pilar, s/n, Zaragoza',
      phone: '+34 976 29 12 31',
      rating: 4.5,
      description: 'Basílica barroca, centro de peregrinación mariana'
    },
    {
      id: '139',
      name: 'Parque Nacional de Ordesa',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.6414, lng: -0.0418 },
      address: 'Parque Nacional de Ordesa y Monte Perdido',
      phone: '+34 974 24 33 61',
      rating: 4.8,
      description: 'Parque nacional pirenaico con cascadas espectaculares'
    },
    {
      id: '140',
      name: 'Castillo de Loarre',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.3178, lng: -0.6178 },
      address: 'Loarre, Huesca',
      phone: '+34 974 34 21 61',
      rating: 4.6,
      description: 'Castillo románico mejor conservado de Europa'
    },

    // ======= MÁS LUGARES POR TODA ESPAÑA =======

    // Burgos
    {
      id: '141',
      name: 'Catedral de Burgos',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.3404, lng: -3.7036 },
      address: 'Plaza del Rey San Fernando, s/n, Burgos',
      phone: '+34 947 20 47 12',
      rating: 4.8,
      description: 'Catedral gótica Patrimonio de la Humanidad, una de las más bellas de España',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '142',
      name: 'Monasterio de Las Huelgas',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.3478, lng: -3.7238 },
      address: 'C. de los Compases de Huelgas, 1, Burgos',
      phone: '+34 947 20 16 30',
      rating: 4.6,
      description: 'Monasterio cisterciense real fundado en 1187, panteón de reyes',
      images: [
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '143',
      name: 'Castillo de Burgos',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.3449, lng: -3.6986 },
      address: 'Cerro de San Miguel, s/n, Burgos',
      phone: '+34 947 28 88 74',
      rating: 4.3,
      description: 'Fortaleza medieval con vistas panorámicas de la ciudad',
      images: [
        'https://images.unsplash.com/photo-1555085922-2425ae1d6c60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '144',
      name: 'Restaurante Casa Ojeda',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.3404, lng: -3.7019 },
      address: 'C. de Vitoria, 5, Burgos',
      phone: '+34 947 20 90 52',
      rating: 4.4,
      description: 'Cocina castellana tradicional en pleno centro histórico'
    },
    {
      id: '145',
      name: 'Hotel NH Collection Palacio de Burgos',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.3391, lng: -3.7025 },
      address: 'C. de la Merced, 13, Burgos',
      phone: '+34 947 47 96 00',
      rating: 4.5,
      description: 'Hotel de lujo en palacio del siglo XVI restaurado'
    },
    {
      id: '146',
      name: 'Repsol - Burgos Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.3594, lng: -3.6898 },
      address: 'A-1, Km 243, Burgos',
      phone: '+34 900 122 122',
      description: 'Área de servicio completa en la autovía'
    },

    // Salamanca
    {
      id: '147',
      name: 'Plaza Mayor de Salamanca',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.9648, lng: -5.6639 },
      address: 'Plaza Mayor, s/n, Salamanca',
      phone: '+34 923 21 83 42',
      rating: 4.8,
      description: 'Una de las plazas más bellas de España, joya del barroco español',
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '148',
      name: 'Universidad de Salamanca',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.9631, lng: -5.6692 },
      address: 'C. Libreros, 1, Salamanca',
      phone: '+34 923 29 44 00',
      rating: 4.7,
      description: 'Universidad más antigua de España, fundada en 1218',
      images: [
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },

    // Valladolid
    {
      id: '149',
      name: 'Museo Nacional de Escultura',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.6518, lng: -4.7245 },
      address: 'C. de las Cadenas de San Gregorio, 1, Valladolid',
      phone: '+34 983 25 03 75',
      rating: 4.5,
      description: 'Excepcional colección de escultura religiosa española'
    },
    {
      id: '150',
      name: 'Restaurante Los Zagales',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 41.6523, lng: -4.7245 },
      address: 'Paseo de Zorrilla, 10, Valladolid',
      phone: '+34 983 33 43 55',
      rating: 4.3,
      description: 'Cocina castellana tradicional'
    },

    // Santander
    {
      id: '151',
      name: 'Palacio de la Magdalena',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.4742, lng: -3.7859 },
      address: 'Av. de la Reina Victoria, s/n, Santander',
      phone: '+34 942 20 30 84',
      rating: 4.6,
      description: 'Palacio real de verano con espectaculares vistas al mar',
      images: [
        'https://images.unsplash.com/photo-1555085922-2425ae1d6c60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '152',
      name: 'Hotel Bahía',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.4623, lng: -3.8050 },
      address: 'C. de Calderón de la Barca, 3, Santander',
      phone: '+34 942 20 50 28',
      rating: 4.2,
      description: 'Hotel céntrico con vistas a la bahía'
    },

    // Logroño
    {
      id: '153',
      name: 'Catedral de La Redonda',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.4672, lng: -2.4449 },
      address: 'Plaza del Mercado, s/n, Logroño',
      phone: '+34 941 25 76 11',
      rating: 4.4,
      description: 'Catedral barroca en el corazón de Logroño'
    },
    {
      id: '154',
      name: 'Calle del Laurel',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.4664, lng: -2.4434 },
      address: 'Calle del Laurel, Logroño',
      phone: '+34 941 23 45 67',
      rating: 4.5,
      description: 'Famosa calle de tapas y pinchos riojanos'
    },

    // Oviedo
    {
      id: '155',
      name: 'Catedral de Oviedo',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 43.3614, lng: -5.8428 },
      address: 'Plaza Alfonso II el Casto, s/n, Oviedo',
      phone: '+34 985 22 10 33',
      rating: 4.6,
      description: 'Catedral gótica con la famosa Cámara Santa prerrománica',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },

    // León
    {
      id: '156',
      name: 'Catedral de León',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.5987, lng: -5.5671 },
      address: 'Plaza de Regla, s/n, León',
      phone: '+34 987 87 57 70',
      rating: 4.8,
      description: 'Catedral gótica famosa por sus vidrieras medievales',
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '157',
      name: 'Casa Botines',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.5979, lng: -5.5693 },
      address: 'Plaza de San Marcelo, 5, León',
      phone: '+34 987 35 34 50',
      rating: 4.5,
      description: 'Edificio modernista diseñado por Antoni Gaudí'
    },

    // Ávila
    {
      id: '158',
      name: 'Murallas de Ávila',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 40.6565, lng: -4.6816 },
      address: 'Puerta del Alcázar, s/n, Ávila',
      phone: '+34 920 21 13 87',
      rating: 4.7,
      description: 'Murallas medievales mejor conservadas de Europa, Patrimonio UNESCO',
      images: [
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },

    // Zamora
    {
      id: '159',
      name: 'Catedral de Zamora',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.5023, lng: -5.7357 },
      address: 'Plaza de la Catedral, s/n, Zamora',
      phone: '+34 980 53 06 44',
      rating: 4.5,
      description: 'Catedral románica con cúpula bizantina única'
    },

    // Palencia
    {
      id: '160',
      name: 'Catedral de Palencia',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 42.0096, lng: -4.5281 },
      address: 'Plaza de la Inmaculada, s/n, Palencia',
      phone: '+34 979 70 19 47',
      rating: 4.4,
      description: 'La Bella Desconocida, catedral gótica con cripta visigótica'
    },

    // Soria
    {
      id: '161',
      name: 'Monasterio de San Juan de Duero',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 41.7567, lng: -2.4598 },
      address: 'Paseo de San Juan de Duero, s/n, Soria',
      phone: '+34 975 23 02 18',
      rating: 4.6,
      description: 'Ruinas románicas junto al río Duero'
    },

    // Ciudades importantes de otras comunidades

    // Córdoba
    {
      id: '162',
      name: 'Mezquita-Catedral de Córdoba',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.8790, lng: -4.7794 },
      address: 'C. del Cardenal Herrero, 1, Córdoba',
      phone: '+34 957 47 05 12',
      rating: 4.9,
      description: 'Obra maestra del arte islámico y cristiano, Patrimonio UNESCO',
      images: [
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },

    // Cádiz
    {
      id: '163',
      name: 'Catedral de Cádiz',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 36.5294, lng: -6.2936 },
      address: 'Plaza de la Catedral, s/n, Cádiz',
      phone: '+34 956 25 99 12',
      rating: 4.5,
      description: 'Catedral barroca con cúpula dorada frente al mar'
    },

    // Jaén
    {
      id: '164',
      name: 'Catedral de Jaén',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.7646, lng: -3.7906 },
      address: 'Plaza de Santa María, s/n, Jaén',
      phone: '+34 953 23 42 33',
      rating: 4.6,
      description: 'Catedral renacentista, prototipo para las catedrales americanas'
    },

    // Huelva
    {
      id: '165',
      name: 'Monasterio de La Rábida',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 37.2073, lng: -6.9161 },
      address: 'Paraje de la Rábida, s/n, Palos de la Frontera, Huelva',
      phone: '+34 959 35 04 11',
      rating: 4.7,
      description: 'Lugar donde Colón preparó su viaje a América'
    },

    // Almería
    {
      id: '166',
      name: 'Alcazaba de Almería',
      category: PlaceCategory.TOURIST_ATTRACTION,
      location: { lat: 36.8402, lng: -2.4690 },
      address: 'C. Almanzor, s/n, Almería',
      phone: '+34 950 17 55 00',
      rating: 4.5,
      description: 'Fortaleza musulmana con vistas al Mediterráneo'
    },

    // Más gasolineras en provincias importantes
    {
      id: '167',
      name: 'Cepsa - León Centro',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.5987, lng: -5.5550 },
      address: 'Av. de Ordoño II, 45, León',
      phone: '+34 902 242 424',
      description: 'Gasolinera céntrica con todos los servicios'
    },
    {
      id: '168',
      name: 'Shell - Salamanca',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 40.9648, lng: -5.6500 },
      address: 'Ctra. de Madrid, Km 4, Salamanca',
      phone: '+34 923 12 34 56',
      description: 'Estación con área de descanso'
    },
    {
      id: '169',
      name: 'BP - Córdoba Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 37.8650, lng: -4.7794 },
      address: 'A-4, Km 395, Córdoba',
      phone: '+34 957 12 34 56',
      description: 'Área de servicio en autovía de Andalucía'
    },

    // Más alojamientos
    {
      id: '170',
      name: 'Parador de León',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.5979, lng: -5.5671 },
      address: 'Plaza de San Marcos, 7, León',
      phone: '+34 987 23 73 00',
      rating: 4.7,
      description: 'Parador en convento renacentista de San Marcos'
    },
    {
      id: '171',
      name: 'Hotel Rector Salamanca',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 40.9631, lng: -5.6650 },
      address: 'Paseo del Rector Esperabé, 10, Salamanca',
      phone: '+34 923 21 84 82',
      rating: 4.6,
      description: 'Hotel boutique en palacio del siglo XVIII'
    },

    // ======= EXTENSIÓN MASIVA POR TODA ESPAÑA =======

    // GALICIA - A Coruña
    {
      id: '301',
      name: 'Marisquería Rías Baixas',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.3623, lng: -8.4115 },
      address: 'Rúa da Estrela, 2, A Coruña',
      phone: '+34 981 20 69 69',
      rating: 4.3,
      description: 'Mariscos frescos del Atlántico gallego'
    },
    {
      id: '302',
      name: 'Hotel Hesperia A Coruña',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.3718, lng: -8.3960 },
      address: 'Av. Pedro Barrié de la Maza, 29, A Coruña',
      phone: '+34 981 21 00 00',
      rating: 4.2,
      description: 'Hotel moderno frente al mar'
    },
    {
      id: '303',
      name: 'Repsol - A Coruña Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.3851, lng: -8.3774 },
      address: 'AP-9, Km 651, A Coruña',
      phone: '+34 900 122 122',
      description: 'Área de servicio autopista Atlántica'
    },

    // GALICIA - Vigo
    {
      id: '304',
      name: 'Restaurante Maruja Limón',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.2406, lng: -8.7207 },
      address: 'Rúa Méndez Núñez, 40, Vigo',
      phone: '+34 986 47 34 06',
      rating: 4.4,
      description: 'Cocina marinera de autor con estrella Michelin'
    },
    {
      id: '305',
      name: 'Parador de Vigo',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.2328, lng: -8.7286 },
      address: 'Av. de Castelao, 32, Vigo',
      phone: '+34 986 11 70 20',
      rating: 4.1,
      description: 'Parador con vistas a la ría de Vigo'
    },
    {
      id: '306',
      name: 'Cepsa - Vigo Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.2133, lng: -8.7364 },
      address: 'A-52, Km 585, Vigo',
      phone: '+34 902 242 424',
      description: 'Estación de servicio en ruta a Portugal'
    },

    // GALICIA - Santiago de Compostela
    {
      id: '307',
      name: 'Casa Marcelo',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.8805, lng: -8.5456 },
      address: 'Rúa das Hortas, 1, Santiago de Compostela',
      phone: '+34 981 55 85 80',
      rating: 4.6,
      description: 'Fusión gallego-asiática única'
    },
    {
      id: '308',
      name: 'Parador Santiago - Hostal dos Reis Católicos',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.8804, lng: -8.5448 },
      address: 'Praza do Obradoiro, 1, Santiago de Compostela',
      phone: '+34 981 58 22 00',
      rating: 4.8,
      description: 'Hospital de peregrinos convertido en parador de lujo'
    },
    {
      id: '309',
      name: 'Shell - Santiago Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.9045, lng: -8.5234 },
      address: 'A-6, Km 544, Santiago de Compostela',
      phone: '+34 981 59 12 34',
      description: 'Área de servicio Camino de Santiago'
    },

    // PAÍS VASCO - San Sebastián
    {
      id: '310',
      name: 'Arzak',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.3038, lng: -1.9604 },
      address: 'Av. del Alcalde José Elosegi, 273, San Sebastián',
      phone: '+34 943 27 84 65',
      rating: 4.9,
      description: '3 estrellas Michelin, cocina vasca de vanguardia'
    },
    {
      id: '311',
      name: 'Hotel María Cristina',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.3213, lng: -1.9812 },
      address: 'Paseo República Argentina, 4, San Sebastián',
      phone: '+34 943 43 76 00',
      rating: 4.7,
      description: 'Hotel de lujo Belle Époque frente a la playa'
    },
    {
      id: '312',
      name: 'BP - San Sebastián Este',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.3156, lng: -1.9234 },
      address: 'A-8, Km 463, San Sebastián',
      phone: '+34 943 31 23 45',
      description: 'Área de servicio costera'
    },

    // PAÍS VASCO - Bilbao
    {
      id: '313',
      name: 'Restaurante Mina',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 43.2627, lng: -2.9253 },
      address: 'Muelle de Marzana, 1, Bilbao',
      phone: '+34 944 79 59 38',
      rating: 4.5,
      description: 'Estrella Michelin en el corazón de Bilbao'
    },
    {
      id: '314',
      name: 'Hotel Carlton',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 43.2630, lng: -2.9349 },
      address: 'Plaza Federico Moyúa, 2, Bilbao',
      phone: '+34 944 16 22 00',
      rating: 4.3,
      description: 'Hotel histórico en el centro de Bilbao'
    },
    {
      id: '315',
      name: 'Repsol - Bilbao Oeste',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 43.2441, lng: -2.9695 },
      address: 'A-8, Km 394, Bilbao',
      phone: '+34 900 122 122',
      description: 'Estación en cinturón industrial'
    },

    // CATALUÑA - Girona
    {
      id: '316',
      name: 'El Celler de Can Roca',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 41.9794, lng: 2.8214 },
      address: 'Can Sunyer, 48, Girona',
      phone: '+34 972 22 21 57',
      rating: 5.0,
      description: '3 estrellas Michelin, mejor restaurante del mundo'
    },
    {
      id: '317',
      name: 'Hotel Històric',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 41.9837, lng: 2.8249 },
      address: 'Carrer Bellmirall, 4A, Girona',
      phone: '+34 972 22 35 83',
      rating: 4.4,
      description: 'Hotel boutique en el casco histórico'
    },
    {
      id: '318',
      name: 'Galp - Girona Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.0045, lng: 2.8345 },
      address: 'AP-7, Km 87, Girona',
      phone: '+34 972 18 45 67',
      description: 'Área de servicio autopista del Mediterráneo'
    },

    // COMUNIDAD VALENCIANA - Alicante
    {
      id: '319',
      name: 'Monastrell',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 38.3452, lng: -0.4810 },
      address: 'C. Maestro Bretón, 5, Alicante',
      phone: '+34 965 12 03 68',
      rating: 4.3,
      description: 'Estrella Michelin, cocina mediterránea moderna'
    },
    {
      id: '320',
      name: 'Hotel Sercotel Suites del Mar',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 38.3567, lng: -0.4902 },
      address: 'Av. de Niza, 38, Alicante',
      phone: '+34 965 14 30 43',
      rating: 4.2,
      description: 'Apartahotel frente al mar Mediterráneo'
    },
    {
      id: '321',
      name: 'Cepsa - Alicante Centro',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 38.3456, lng: -0.4689 },
      address: 'Av. de Denia, 145, Alicante',
      phone: '+34 902 242 424',
      description: 'Gasolinera urbana con lavado automático'
    },

    // ANDALUCÍA - Córdoba
    {
      id: '322',
      name: 'Noor Restaurant',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 37.8845, lng: -4.7760 },
      address: 'C. Pablo Ruiz Picasso, s/n, Córdoba',
      phone: '+34 957 96 44 25',
      rating: 4.7,
      description: 'Estrella Michelin, cocina andalusí contemporánea'
    },
    {
      id: '323',
      name: 'Hotel Maestre',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 37.8881, lng: -4.7794 },
      address: 'C. Romero Barros, 4-6, Córdoba',
      phone: '+34 957 47 24 10',
      rating: 4.1,
      description: 'Hotel familiar cerca de la Mezquita'
    },
    {
      id: '324',
      name: 'Shell - Córdoba Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 37.8634, lng: -4.7589 },
      address: 'A-4, Km 396, Córdoba',
      phone: '+34 957 32 45 67',
      description: 'Área de servicio Andalucía'
    },

    // ANDALUCÍA - Granada
    {
      id: '325',
      name: 'Restaurante Ruta del Azafrán',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 37.1760, lng: -3.5881 },
      address: 'Paseo de los Tristes, 1, Granada',
      phone: '+34 958 22 68 82',
      rating: 4.4,
      description: 'Cocina andaluza con vistas a la Alhambra'
    },
    {
      id: '326',
      name: 'Parador de Granada',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 37.1765, lng: -3.5908 },
      address: 'Real de la Alhambra, s/n, Granada',
      phone: '+34 958 22 14 40',
      rating: 4.6,
      description: 'Convento del siglo XV dentro de la Alhambra'
    },
    {
      id: '327',
      name: 'BP - Granada Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 37.1945, lng: -3.5734 },
      address: 'A-92, Km 280, Granada',
      phone: '+34 958 15 67 89',
      description: 'Estación con vista a Sierra Nevada'
    },

    // CASTILLA Y LEÓN - Valladolid
    {
      id: '328',
      name: 'Trascorrales',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 41.6523, lng: -4.7245 },
      address: 'C. de Correos, 1, Valladolid',
      phone: '+34 983 33 22 32',
      rating: 4.2,
      description: 'Cocina castellana tradicional y de mercado'
    },
    {
      id: '329',
      name: 'Hotel Nexus Valladolid',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 41.6558, lng: -4.7234 },
      address: 'Av. de Ramón Pradera, 10-12, Valladolid',
      phone: '+34 983 37 07 00',
      rating: 4.0,
      description: 'Hotel moderno en el centro comercial'
    },
    {
      id: '330',
      name: 'Repsol - Valladolid Este',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 41.6723, lng: -4.6934 },
      address: 'A-62, Km 125, Valladolid',
      phone: '+34 900 122 122',
      description: 'Área de servicio Campos de Castilla'
    },

    // CASTILLA Y LEÓN - León
    {
      id: '331',
      name: 'Cocinandos',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.5987, lng: -5.5671 },
      address: 'C. de la Capilla, 7, León',
      phone: '+34 987 96 17 68',
      rating: 4.5,
      description: 'Estrella Michelin, cocina leonesa creativa'
    },
    {
      id: '332',
      name: 'Parador de León',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.6010, lng: -5.5663 },
      address: 'Plaza de San Marcos, 7, León',
      phone: '+34 987 23 73 00',
      rating: 4.7,
      description: 'Monasterio del siglo XVI, joya arquitectónica'
    },
    {
      id: '333',
      name: 'Cepsa - León Oeste',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.5834, lng: -5.5934 },
      address: 'A-6, Km 334, León',
      phone: '+34 902 242 424',
      description: 'Estación en ruta del Camino de Santiago'
    },

    // ARAGÓN - Huesca
    {
      id: '334',
      name: 'Restaurante Tatau Bistró',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 42.1360, lng: -0.4081 },
      address: 'C. del Padre Huesca, 13, Huesca',
      phone: '+34 974 21 16 91',
      rating: 4.1,
      description: 'Bistró moderno con productos de la zona'
    },
    {
      id: '335',
      name: 'Hotel Pedro I de Aragón',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 42.1357, lng: -0.4103 },
      address: 'C. del Parque, 34, Huesca',
      phone: '+34 974 22 03 00',
      rating: 3.9,
      description: 'Hotel familiar en el centro histórico'
    },
    {
      id: '336',
      name: 'Shell - Huesca Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 42.1145, lng: -0.3967 },
      address: 'A-23, Km 315, Huesca',
      phone: '+34 974 23 45 67',
      description: 'Área de servicio hacia los Pirineos'
    },

    // ARAGÓN - Teruel
    {
      id: '337',
      name: 'Restaurante La Menta',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 40.3456, lng: -1.1063 },
      address: 'C. de Bartolomé Esteban, 10, Teruel',
      phone: '+34 978 60 75 32',
      rating: 4.0,
      description: 'Cocina aragonesa con jamón de Teruel'
    },
    {
      id: '338',
      name: 'Hotel Reina Cristina',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 40.3467, lng: -1.1089 },
      address: 'Paseo del Óvalo, 1, Teruel',
      phone: '+34 978 60 68 60',
      rating: 3.8,
      description: 'Hotel clásico frente a Los Arcos'
    },
    {
      id: '339',
      name: 'BP - Teruel Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 40.3634, lng: -1.0945 },
      address: 'A-23, Km 141, Teruel',
      phone: '+34 978 61 23 45',
      description: 'Estación de montaña'
    },

    // CASTILLA-LA MANCHA - Toledo
    {
      id: '340',
      name: 'Restaurante Adolfo',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 39.8628, lng: -4.0273 },
      address: 'C. de la Granada, 6, Toledo',
      phone: '+34 925 22 73 21',
      rating: 4.3,
      description: 'Alta cocina toledana en palacio del siglo XIV'
    },
    {
      id: '341',
      name: 'Parador de Toledo',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.8515, lng: -4.0383 },
      address: 'Cerro del Emperador, s/n, Toledo',
      phone: '+34 925 22 18 50',
      rating: 4.4,
      description: 'Parador con vistas panorámicas de Toledo'
    },
    {
      id: '342',
      name: 'Repsol - Toledo Sur',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 39.8345, lng: -4.0167 },
      address: 'A-42, Km 72, Toledo',
      phone: '+34 900 122 122',
      description: 'Área de servicio ciudad imperial'
    },

    // COMUNIDAD VALENCIANA - Castellón
    {
      id: '343',
      name: 'Restaurante Aqua',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 39.9864, lng: -0.0513 },
      address: 'Paseo Marítimo, 5, Castellón de la Plana',
      phone: '+34 964 28 50 47',
      rating: 4.0,
      description: 'Arroces y mariscos frente al Mediterráneo'
    },
    {
      id: '344',
      name: 'Hotel Intur Castellón',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.9839, lng: -0.0315 },
      address: 'Av. del Mar, 23, Castellón de la Plana',
      phone: '+34 964 22 50 00',
      rating: 4.1,
      description: 'Hotel moderno cerca del puerto'
    },
    {
      id: '345',
      name: 'Cepsa - Castellón Norte',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 40.0045, lng: -0.0234 },
      address: 'AP-7, Km 45, Castellón de la Plana',
      phone: '+34 902 242 424',
      description: 'Estación costera mediterránea'
    },

    // EXTREMADURA - Badajoz
    {
      id: '346',
      name: 'Restaurante Aldebarán',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 38.8794, lng: -6.9706 },
      address: 'Av. de Elvas, 13, Badajoz',
      phone: '+34 924 27 42 61',
      rating: 4.2,
      description: 'Cocina extremeña tradicional y creativa'
    },
    {
      id: '347',
      name: 'Hotel Sercotel Gran Hotel Zurbarán',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 38.8837, lng: -6.9685 },
      address: 'Paseo de Fluvial, s/n, Badajoz',
      phone: '+34 924 00 14 00',
      rating: 4.0,
      description: 'Hotel de negocios junto al Guadiana'
    },
    {
      id: '348',
      name: 'Shell - Badajoz Este',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 38.8945, lng: -6.9345 },
      address: 'A-5, Km 409, Badajoz',
      phone: '+34 924 26 78 90',
      description: 'Área de servicio fronteriza con Portugal'
    },

    // ISLAS BALEARES - Menorca
    {
      id: '349',
      name: 'Restaurante Sa Llagosta',
      category: PlaceCategory.RESTAURANT,
      location: { lat: 39.8628, lng: 4.2671 },
      address: 'Moll de Llevant, 334, Fornells, Menorca',
      phone: '+34 971 37 66 54',
      rating: 4.4,
      description: 'Caldereta de langosta menorquina auténtica'
    },
    {
      id: '350',
      name: 'Hotel Rural Morvedra Nou',
      category: PlaceCategory.ACCOMMODATION,
      location: { lat: 39.9345, lng: 4.0567 },
      address: 'Ctra. Ciudadela-Cala Morell, Km 4, Ciudadela, Menorca',
      phone: '+34 971 35 95 21',
      rating: 4.3,
      description: 'Agroturismo en finca menorquina tradicional'
    },
    {
      id: '351',
      name: 'Estación ES - Menorca',
      category: PlaceCategory.GAS_STATION,
      location: { lat: 39.8756, lng: 4.2189 },
      address: 'Av. Fort de l\'Eau, 89, Mahón, Menorca',
      phone: '+34 971 35 12 34',
      description: 'Gasolinera principal de la isla'
    }
  ];  constructor() { }

  getPlaces(): Observable<Place[]> {
    return of(this.mockPlaces);
  }

  getPlacesByCategory(category: PlaceCategory): Observable<Place[]> {
    return of(this.mockPlaces.filter(place => place.category === category));
  }

  getCategoryConfigs(): PlaceCategoryConfig[] {
    return this.categoryConfigs;
  }

  getCategoryConfig(category: PlaceCategory): PlaceCategoryConfig | undefined {
    return this.categoryConfigs.find(config => config.key === category);
  }

  searchPlaces(query: string): Observable<Place[]> {
    const searchTerm = query.toLowerCase().trim();

    // Diccionario completo de provincias, ciudades y pueblos de España
    const spanishLocations: { [key: string]: string[] } = {
      // Todas las provincias y sus ciudades principales
      'madrid': ['madrid', 'alcalá de henares', 'móstoles', 'leganés', 'getafe', 'alcorcón', 'fuenlabrada', 'torrejón', 'parla', 'alcobendas'],
      'barcelona': ['barcelona', 'hospitalet', 'terrassa', 'badalona', 'sabadell', 'mataró', 'santa coloma', 'cornellà', 'sant boi'],
      'valencia': ['valencia', 'gandía', 'sagunto', 'torrent', 'castellón', 'vila-real', 'elda', 'alzira'],
      'sevilla': ['sevilla', 'dos hermanas', 'alcalá de guadaíra', 'utrera', 'mairena del aljarafe', 'coria del río'],
      'zaragoza': ['zaragoza', 'calatayud', 'ejea de los caballeros', 'tarazona', 'caspe', 'huesca', 'teruel'],
      'málaga': ['málaga', 'marbella', 'fuengirola', 'torremolinos', 'benalmádena', 'estepona', 'antequera'],
      'murcia': ['murcia', 'cartagena', 'lorca', 'molina de segura', 'alcantarilla', 'jumilla'],
      'palma': ['palma', 'ibiza', 'mahón', 'manacor', 'inca', 'ciutadella', 'calvià'],
      'las palmas': ['las palmas', 'telde', 'santa lucía', 'arucas', 'agüimes'],
      'bilbao': ['bilbao', 'barakaldo', 'getxo', 'portugalete', 'santurtzi', 'basauri'],
      'alicante': ['alicante', 'elche', 'torrevieja', 'orihuela', 'benidorm', 'alcoy', 'elda'],
      'córdoba': ['córdoba', 'lucena', 'puente genil', 'montilla', 'priego de córdoba'],
      'valladolid': ['valladolid', 'laguna de duero', 'medina del campo', 'arroyo de la encomienda'],
      'vigo': ['vigo', 'pontevedra', 'vilagarcía de arousa', 'redondela', 'cangas'],
      'gijón': ['gijón', 'oviedo', 'avilés', 'mieres', 'langreo', 'siero'],
      'hospitalet': ['hospitalet de llobregat', 'barcelona'],
      'coruña': ['a coruña', 'ferrol', 'santiago de compostela', 'lugo', 'ourense'],
      'granada': ['granada', 'motril', 'loja', 'baza', 'guadix', 'almuñécar'],
      'vitoria': ['vitoria-gasteiz', 'llodio', 'amurrio'],
      'santa cruz': ['santa cruz de tenerife', 'la laguna', 'arona', 'granadilla', 'adeje'],
      'elche': ['elche', 'alicante', 'crevillent'],
      'oviedo': ['oviedo', 'gijón', 'avilés'],
      'terrassa': ['terrassa', 'sabadell', 'barcelona'],
      'badalona': ['badalona', 'santa coloma de gramenet'],
      'cartagena': ['cartagena', 'la unión'],
      'jerez': ['jerez de la frontera', 'cádiz'],
      'sabadell': ['sabadell', 'terrassa'],
      'móstoles': ['móstoles', 'madrid'],
      'alcalá': ['alcalá de henares', 'madrid'],
      'pamplona': ['pamplona', 'tudela', 'barañáin'],
      'fuenlabrada': ['fuenlabrada', 'madrid'],
      'almería': ['almería', 'roquetas de mar', 'el ejido'],
      'santander': ['santander', 'torrelavega', 'camargo'],
      'burgos': ['burgos', 'miranda de ebro', 'aranda de duero'],
      'castellón': ['castellón de la plana', 'vila-real'],
      'getafe': ['getafe', 'madrid'],
      'alcorcón': ['alcorcón', 'madrid'],
      'logroño': ['logroño', 'calahorra', 'arnedo'],
      'badajoz': ['badajoz', 'mérida', 'don benito'],
      'salamanca': ['salamanca', 'béjar', 'ciudad rodrigo'],
      'huelva': ['huelva', 'lepe', 'almonte'],
      'lérida': ['lérida', 'lleida'],
      'tarragona': ['tarragona', 'reus', 'tortosa'],
      'león': ['león', 'ponferrada', 'san andrés del rabanedo'],
      'cádiz': ['cádiz', 'jerez de la frontera', 'algeciras'],
      'jaén': ['jaén', 'linares', 'andújar'],
      'ourense': ['ourense', 'orense', 'verín'],
      'toledo': ['toledo', 'talavera de la reina'],
      'albacete': ['albacete', 'hellín', 'villarrobledo'],
      'guadalajara': ['guadalajara', 'azuqueca de henares'],
      'cáceres': ['cáceres', 'plasencia', 'navalmoral de la mata'],
      'donostia': ['san sebastián', 'donostia', 'irún'],
      'girona': ['girona', 'figueres', 'blanes'],
      'melilla': ['melilla'],
      'ceuta': ['ceuta']
    };

    const filteredPlaces = this.mockPlaces.filter(place => {
      const addressParts = place.address.toLowerCase().split(',').map(s => s.trim());
      const placeName = place.name.toLowerCase();
      const description = place.description?.toLowerCase() || '';
      const fullText = `${placeName} ${place.address.toLowerCase()} ${description}`;

      // Búsqueda directa
      if (fullText.includes(searchTerm)) {
        return true;
      }

      // Búsqueda en el diccionario de ubicaciones españolas
      for (const [mainCity, relatedCities] of Object.entries(spanishLocations)) {
        if (searchTerm === mainCity || searchTerm.includes(mainCity) || mainCity.includes(searchTerm)) {
          // Si coincide con ciudad principal, buscar en dirección
          const cityMatch = relatedCities.some(city =>
            addressParts.some(part => part.includes(city) || city.includes(part))
          ) || addressParts.some(part => part.includes(mainCity) || mainCity.includes(part));

          if (cityMatch) return true;
        }

        // Búsqueda en ciudades relacionadas
        const relatedMatch = relatedCities.some(city =>
          searchTerm === city || searchTerm.includes(city) || city.includes(searchTerm)
        );

        if (relatedMatch) {
          const locationMatch = addressParts.some(part =>
            relatedCities.some(city => part.includes(city) || city.includes(part)) ||
            part.includes(mainCity) || mainCity.includes(part)
          );
          if (locationMatch) return true;
        }
      }

      // Búsqueda flexible por palabras
      const searchWords = searchTerm.split(/\s+/).filter(w => w.length > 2);
      return searchWords.length > 0 && searchWords.some(word =>
        fullText.includes(word) ||
        addressParts.some(part => part.includes(word) || word.includes(part))
      );
    });

    return of(filteredPlaces);
  }
}
