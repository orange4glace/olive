import * as React from 'react'

import { PropertyViewNode, PropertyViewNodeFormView, PropertyViewNodeTimelineEmptyView } from "./node";
import { PropertyTypes, Property, Vector2Property, Drawing, ScalarProperty, PolyPathProperty } from "internal/drawing";
import { PropertyViewNodeType } from "./node-type";
import { Vector2PropertyControl, PathPropertyControl } from "../form/pannel/component/property-control";
import { PropertyHost } from 'window/view/timeline/controller/property-host';
import { PropertyViewController } from '../control/property-view-controller';
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';
import { TrackItemHost } from 'window/view/timeline/controller';
import { PropertyType } from 'internal/drawing/property-type';

export function CreatePropertyViewPropertyNode(trackItemHost: TrackItemHost, drawingHost: DrawingHost<Drawing>, propertyHost: PropertyHost<Property<PropertyTypes>>) {
  let constructor: any = null;
  switch (propertyHost.property.type) {
    // case PropertyType.SCALAR:
    //   constructor = PropertyViewScalarPropertyNode;
    //   break;
    case PropertyType.VECTOR2:
      constructor = PropertyViewVector2PropertyNode;
      break;
    case PropertyType.POLYPATH:
      constructor = PropertyViewPolypathPropertyNode;
      break;
    default:
      constructor = PropertyViewPropertyViewDrawingNode;
      break;
  }
  return new constructor(trackItemHost, drawingHost);
}






abstract class PropertyViewPropertyNode<T extends Property<PropertyTypes>> extends PropertyViewNode {
  propertyViewController: PropertyViewController;
  drawingHost: DrawingHost<Drawing>
  propertyHost: PropertyHost<T>;

  constructor(propertyViewController: PropertyViewController, drawingHost: DrawingHost<Drawing>, propertyHost: PropertyHost<T>) {
    super(PropertyViewNodeType.PROPERTY);
    this.propertyViewController = propertyViewController;
    this.drawingHost = drawingHost;
    this.propertyHost = propertyHost;

    this.timelineView = PropertyViewNodeTimelineEmptyView;
  }
}

class PropertyViewPropertyNodeFormView<T extends Property<PropertyTypes>>
    extends PropertyViewNodeFormView<PropertyViewPropertyNode<T>> {
}






// export class PropertyViewScalarPropertyNode extends PropertyViewPropertyNode<ScalarProperty> {

//   construct() {
//     this.formView = ScalarPropertyNodeFormView;
//   }

// }

// class ScalarPropertyNodeFormView extends PropertyViewPropertyNodeFormView<ScalarProperty> {
//   render() {
//     const node = this.props.node;
//     const controller = node.propertyViewController;
//     const timeline = controller.timelineViewController.timelineHost.timeline;
//     const trackItemHost = controller.trackItemHost;
//     return ( <Vector2PropertyControl label={'position'} 
//         timeline={timeline} trackItemHost={trackItemHost}
//         drawingHost={node.drawingHost} propertyHost={node.propertyHost}/> )
//   }
// }





export class PropertyViewVector2PropertyNode extends PropertyViewPropertyNode<Vector2Property> {

  construct() {
    this.formView = Vector2PropertyNodeFormView;
  }

}

class Vector2PropertyNodeFormView extends PropertyViewPropertyNodeFormView<Vector2Property> {
  render() {
    const node = this.props.node;
    const controller = node.propertyViewController;
    const timeline = controller.timelineViewController.timelineHost.timeline;
    const trackItemHost = controller.trackItemHost;
    return ( <Vector2PropertyControl label={'position'} 
        timeline={timeline} trackItemHost={trackItemHost}
        drawingHost={node.drawingHost} propertyHost={node.propertyHost}/> )
  }
}





export class PropertyViewPolypathPropertyNode extends PropertyViewPropertyNode<PolyPathProperty> {

  construct() {
    this.formView = PolypathPropertyNodeFormView;
  }

}

class PolypathPropertyNodeFormView extends PropertyViewPropertyNodeFormView<PolyPathProperty> {
  render() {
    const node = this.props.node;
    const controller = node.propertyViewController;
    const timeline = controller.timelineViewController.timelineHost.timeline;
    const trackItemHost = controller.trackItemHost;
    return ( <PathPropertyControl label={'position'} 
        timeline={timeline} trackItemHost={trackItemHost}
        drawingHost={node.drawingHost} propertyHost={node.propertyHost}/> )
  }
}