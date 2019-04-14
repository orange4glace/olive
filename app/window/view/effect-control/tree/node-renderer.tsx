import * as React from 'react'

import { PropertyViewDrawingNode } from "./drawing-node";
import { Drawing } from "internal/drawing";
import { PropertyViewNode } from './node';
import { PropertyGroupView } from '../form/pannel/component/property-group';


class PropertyViewNodeChildrenRenderer extends React.PureComponent<{
  children: PropertyViewNode[]
}, {}> {
  render() {
    return ( this.props.children.map(node => <PropertyViewNodeRendererSwitch node={node}/>) )
  }
}

class PropertyViewNodeRenderer<T extends PropertyViewNode> extends React.Component<{
  node: T
}, {}> {}

class PropertyViewDrawingPannel<T extends PropertyViewDrawingNode<Drawing>> extends PropertyViewNodeRenderer<T> {
}

class PaperDrawingFormView extends PropertyViewDrawingPannel<PropertyViewPaperNode> {

  render() {
    const node = this.props.node;
    return (
      <PropertyGroupView label='Paper' trackItemHost={node.trackItemHost} drawingHost={node.drawingHost}>
        <PropertyViewNodeChildrenRenderer children={node.children}/>
      </PropertyGroupView>
    )
  }

}