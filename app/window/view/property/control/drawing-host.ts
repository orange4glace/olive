import { PropertyHost } from "./property-host";

export class DrawingHost {
  
  drawing: Drawing;
  propertyHosts: Set<PropertyHost>;

  constructor(drawing: Drawing) {
    this.drawing = drawing;
    this.propertyHosts = new Set();
  }

  addPropertyHost(propertyHost: PropertyHost) {
    this.propertyHosts.add(propertyHost);
  }

  removePropertyHost(propertyHost: PropertyHost) {
    console.assert(this.propertyHosts.has(propertyHost));
    this.propertyHosts.delete(propertyHost);
  }

}