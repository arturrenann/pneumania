import { Component, AfterViewInit } from '@angular/core';

declare var google: any; // Declaração da variável global do Google Maps

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements AfterViewInit {

    rating!: any;

  mapOptions: google.maps.MapOptions = {
    center: {
      lat: -15.805362439778339,
      lng: -47.9488437669609
    },
    zoom: 17,
    mapTypeControl: false,
  };

  markerPosition = { position: null, label: { color: 'black', fontSize: '16px', fontWeight: 'bold', text: '', address: '', mapLink: '' } };

  ngAfterViewInit() {
    this.getPlaceDetails();
  }

  getPlaceDetails() {
    const placeDetailsRequest = {
      placeId: 'ChIJPTl1S7AxWpMRFJPf0-nFP0s', // Troque pelo placeId do local que você deseja buscar detalhes
      fields: ['name', 'formatted_address', 'rating', 'geometry'] // Especifique os campos que você deseja obter
    };

    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(placeDetailsRequest, (place: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.markerPosition = {
          position: place.geometry.location,
          label: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold',
            text: place.name,
            address: place.formatted_address,
            mapLink: `https://maps.google.com/maps?ll=${place.geometry.location.lat()},${place.geometry.location.lng()}&z=18&t=m&hl=en-US&gl=AR&mapclient=embed&cid=${place.place_id}`
          },
        };
        this.rating = place.rating;
        console.log('Place Details:', place);
      } else {
        console.error('Error fetching place details:', status);
      }
    });
  }

  getStarsArray(rating: number): { type: string, color: string }[] {
    const fullStars = Math.floor(rating); // Número de estrelas inteiras
    const decimalPart = rating - fullStars; // Parte decimal da nota
  
    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push({ type: "full", color: "#FFA500" }); // Estrela cheia, cor amarela
    }
  
    if (decimalPart >= 0.75) {
      starsArray.push({ type: "full", color: "#FFA500" }); // Adiciona uma estrela cheia se a parte decimal for maior ou igual a 0.75
    } else if (decimalPart >= 0.25) {
      starsArray.push({ type: "half", color: "#FFA500" }); // Meia estrela, cor amarela
    }
  
    // Preenche o restante com estrelas vazias para totalizar 5 estrelas
    const remainingStars = 5 - starsArray.length;
    for (let i = 0; i < remainingStars; i++) {
      starsArray.push({ type: "empty", color: "transparent" }); // Estrela vazia, cor transparente
    }
  
    return starsArray;
  }
}
