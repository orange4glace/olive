import { PropertyHost } from "./property-host";
import { Property, Drawing, DrawingEvent } from "internal/drawing";

export class DrawingHost {
  
  drawing: Drawing;
  childrenDrawingHosts: Map<Drawing, DrawingHost>;
  propertyHosts: Map<Property<any>, PropertyHost>;

  constructor(drawing: Drawing) {
    this.drawing = drawing;
    this.childrenDrawingHosts =  new Map();
    this.propertyHosts = new Map();

    this.addChildDrawingHost = this.addChildDrawingHost.bind(this);
    this.removeChildDrawingHost = this.removeChildDrawingHost.bind(this);
    this.addPropertyHost = this.addPropertyHost.bind(this);
    this.removePropertyHost = this.removePropertyHost.bind(this);

    drawing.properties.forEach(property => { this.addPropertyHost(property); })
    drawing.children.forEach(child => { this.addChildDrawingHost(child); })
    drawing.addEventListener(DrawingEvent.CHILD_DRAWING_ADDED, this.addChildDrawingHost);
    drawing.addEventListener(DrawingEvent.CHILD_DRAWING_REMOVED, this.removeChildDrawingHost);
    drawing.addEventListener(DrawingEvent.PROPERTY_ADDED, this.addPropertyHost);
    drawing.addEventListener(DrawingEvent.PROPERTY_REMOVED, this.removePropertyHost);
  }

  destructor() {
    this.propertyHosts.forEach(property => property.destructor());
    this.childrenDrawingHosts.forEach(child => child.destructor());
  }

  private addPropertyHost(property: Property<any>) {
    const propertyHost = new PropertyHost(property);
    this.propertyHosts.set(property, propertyHost);
  }

  private removePropertyHost(property: Property<any>) {
    console.assert(this.propertyHosts.has(property));
    this.propertyHosts.delete(property);
  }

  getPropertyHost(property: Property<any>) {
    return this.propertyHosts.get(property);
  }

  private addChildDrawingHost(drawing: Drawing) {
    const drawingHost = new DrawingHost(drawing);
    this.childrenDrawingHosts.set(drawing, drawingHost);
  }

  private removeChildDrawingHost(drawing: Drawing) {
    console.assert(this.childrenDrawingHosts.has(drawing));
    this.childrenDrawingHosts.delete(drawing);
  }

  getChildDrawingHost(drawing: Drawing): DrawingHost {
    return this.childrenDrawingHosts.get(drawing);
  }

}