import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { Flate_serviceService } from '../flate_service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  api:any = environment.apiUrl2

  flatType = 'Apartment'

  constructor(private Service:Flate_serviceService){}
  // map
  currentPopup: mapboxgl.Popup | null = null;
  map: any | undefined;
  onFlatHover(x:any){
    if (this.currentPopup) {
      this.currentPopup.remove();
    }
    const sourceId = `${x._id}`;
    const layerId = `${sourceId}-layer`;
    const features = this.map.queryRenderedFeatures({ layers: [layerId] });
    if (features.length > 0) {
      const feature = features[0];
      const coordinates = feature.geometry.coordinates.slice();
      const description = feature.properties.description;
      // Display popup on the map
      const popupContent = `
      <div class="flex flex-col w-fit p-1 space-x-2">
        <div class=' object-cover'><img src="${this.api}/public/img_units/${x.main_img}" alt=""></div>
        <div class='w-full flex flex-col items-start space-y-1'>
          <h1 class='font-sans text-lg font-semibold'>EGP ${x.price}</h1>
          <div class='flex space-x-2 w-full items-start'>
            <div class='flex space-x-1 items-center'>
              <i class='bx bx-bed'></i>
              <p class='text-md'>${x.bedrooms}</p>
            </div>
            <div class='flex space-x-1 items-center'>
              <i class='bx bx-bath' ></i>
              <p class='text-md'>${x.pathrooms}</p>
            </div>
            <div class='flex space-x-1 items-center'>
              <i class='bx bx-area' ></i>
              <p class='text-md'>${x.area} Sq.M.</p>
            </div>
          </div>
          <h1 class='font-sans text-sm '>${x.location.address}</h1>
        </div>
      </div>`;
this.currentPopup = new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(popupContent)
  .addTo(this.map);
  }}
  allFlat!:any;
  sendAppear(){
    this.Service.appear.next('list')
  }
  ngOnInit(): void {
    this.Service.flatType.subscribe((data)=>{
      this.flatType = data
    })

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 10,
      center: [31.59503368515324,30.01138447952243]
    });

    this.map.on('style.load', () => {
      // Add sources and layers here
      this.addMapSourcesAndLayers();
    });

    this.map.addControl(new mapboxgl.NavigationControl);
  }

  private addMapSourcesAndLayers(): void {
    // Add your map sources and layers based on the data
    this.Service.allflats.subscribe((data: any[]) => {
      this.allFlat = data;

      // Remove existing event listeners
      this.map.off('click');
      this.map.off('mouseenter');
      this.map.off('mouseleave');

      // Clear existing map sources and layers
      Object.keys(this.map.getStyle().sources).forEach(sourceId => {
        const layerId = `${sourceId}-layer`;
        if (this.map.getLayer(layerId)) {
          this.map.removeLayer(layerId);
        }
        this.map.removeSource(sourceId);
      });

      // Add new map sources and layers based on updated data
      data.forEach((x: any) => {
        const sourceId = `${x._id}`;
        this.map.addSource(sourceId, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {
              description: `${x.outdoor_description}`,
              'icon': 'art-gallery'
            },
            'geometry': {
              type: 'Point',
              coordinates: [
                x.location.coordinates[1], x.location.coordinates[0]
              ]
            }
          }
        });

        this.map.addLayer({
          'id': `${sourceId}-layer`,
          'type': 'symbol',
          'source': sourceId,
          'layout': {
            'icon-image': ['get', 'icon'],
            'icon-allow-overlap': true
          }
        });

        // Add event listeners for each layer
        this.map.on('click', `${sourceId}-layer`, (e: any) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          const popupContent = `
            <div class="flex flex-col w-fit p-1 space-x-2">
              <div class=' object-cover'><img src="${this.api}/public/img_units/${x.main_img}" alt=""></div>
              <div class='w-full flex flex-col items-start space-y-1'>
                <h1 class='font-sans text-lg font-semibold'>EGP ${x.price}</h1>
                <div class='flex space-x-2 w-full items-start'>
                  <div class='flex space-x-1 items-center'>
                    <i class='bx bx-bed'></i>
                    <p class='text-md'>${x.bedrooms}</p>
                  </div>
                  <div class='flex space-x-1 items-center'>
                    <i class='bx bx-bath' ></i>
                    <p class='text-md'>${x.pathrooms}</p>
                  </div>
                  <div class='flex space-x-1 items-center'>
                    <i class='bx bx-area' ></i>
                    <p class='text-md'>${x.area} Sq.M.</p>
                  </div>
                </div>
                <h1 class='font-sans text-sm '>${x.location.address}</h1>
              </div>
            </div>`;
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(this.map);
        });

        this.map.on('mouseenter', `${sourceId}-layer`, () => {
          this.map.getCanvas().style.cursor = 'pointer';
        });

        this.map.on('mouseleave', `${sourceId}-layer`, () => {
          this.map.getCanvas().style.cursor = '';
        });
      });
    });
  }

}
