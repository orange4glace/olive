import * as React from 'react'
import { PropertyViewNodeType } from "./node-type";

export abstract class PropertyViewNode {

  readonly type: PropertyViewNodeType;
  children: PropertyViewNode[] = [];

  formView: any;
  timelineView: any;

  constructor(type: PropertyViewNodeType) {
    this.type = type;
  }

  addNode(node: PropertyViewNode) {
    this.children.push(node);
  }
}

export class PropertyViewNodeFormView<T extends PropertyViewNode> extends React.Component<{
  node: T
}, {}> {}

export class PropertyViewNodeTimelineView<T extends PropertyViewNode> extends React.Component<{
  node: T
}, {}> {}

export class PropertyViewNodeTimelineEmptyView<T extends PropertyViewNode> extends React.Component<{
  node: T
}, {}> {
  render() {
    return (<div className='property-timeline-empty'/>)
  }
}

export class PropertyViewNodeChildrenFormViewRenderer extends React.PureComponent<{
  children: PropertyViewNode[]
}, {}> {
  render() {
    return ( this.props.children.map(node => node.formView) )
  }
}