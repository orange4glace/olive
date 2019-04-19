import * as React from 'react'

import { TrackItemHost } from "window/view/timeline/controller";
import { PropertyViewNode, PropertyViewNodeFormView, PropertyViewNodeChildrenFormViewRenderer, PropertyViewNodeTimelineEmptyView } from "./node";
import { PropertyViewNodeType } from "./node-type";

export class PropertyViewTrackItemNode extends PropertyViewNode {
  trackItemHost: TrackItemHost;

  constructor(trackItemHost: TrackItemHost) {
    super(PropertyViewNodeType.TRACK_ITEM);
    this.trackItemHost = trackItemHost;

    this.formView = PropertyViewTrackItemFormView;
    this.timelineView = PropertyViewNodeTimelineEmptyView;
  }

}

class PropertyViewTrackItemFormView extends PropertyViewNodeFormView<PropertyViewTrackItemNode> {
  render() {
    return (
      <div>
        <PropertyViewNodeChildrenFormViewRenderer children={this.props.node.children}/>
      </div>
    )
  }
}