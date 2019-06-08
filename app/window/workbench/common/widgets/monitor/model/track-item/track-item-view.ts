import * as React from 'react'
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { IMonitorWidgetSelectableView, MonitorWidgetSelectableView } from "window/workbench/common/widgets/monitor/model/selectable-view";
import { ITimeline } from "internal/timeline/timeline";
import { mat2d } from "gl-matrix";
import { MonitorWidgetViewProps } from "window/workbench/common/widgets/monitor/widget";
import { ViewSelectorRegistry } from 'window/workbench/common/widgets/common/selector-registry';
import { Registry } from 'platform/registry/common/platform';
import { IConstructorSignature3 } from 'platform/instantiation/common/instantiation';

export interface IMonitorWidgetTrackItemView<T extends ITrackItem> 
    extends IMonitorWidgetSelectableView {

  readonly trackItem: T;

}

export abstract class MonitorWidgetTrackItemView<T extends ITrackItem>
    extends MonitorWidgetSelectableView
    implements IMonitorWidgetTrackItemView<T> {

  constructor(
    parent: MonitorWidgetSelectableView,
    protected readonly timeline_: ITimeline,
    readonly trackItem: T) {
    super(parent);
  }

  __getLocalTransformMatrix() {
    let mat = mat2d.create();
    mat2d.identity(mat);
    return mat;
  }

  __getLocalInverseTransformMatrix() {
    let mat = mat2d.create();
    mat2d.identity(mat);
    return mat;
  }

  __select(x: number, y: number): boolean {
    return false;
  }

  abstract render(): React.ReactNode;

}

export interface MonitorWidgetTrackItemViewProps<T extends MonitorWidgetTrackItemView<any>> {
  view: T;
}

export abstract class MonitorWidgetTrackItemViewComponent<T extends MonitorWidgetTrackItemView<any>> 
    extends React.Component<MonitorWidgetTrackItemViewProps<T>, {}> {

}

export class TrackItemViewSelectorRegistry extends ViewSelectorRegistry
  <string, IConstructorSignature3<MonitorWidgetSelectableView, ITimeline, ITrackItem, MonitorWidgetTrackItemView<any>>> {
  static readonly ID = 'olive.workbench.registry.TrackItemViewSelectorRegistry'
}

Registry.add(TrackItemViewSelectorRegistry.ID, new TrackItemViewSelectorRegistry());