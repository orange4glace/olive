import * as React from 'react'

import Timeline from "internal/timeline/timeline";
import TrackItem from "internal/timeline/track-item";
import { Effect } from "internal/rendering/effect/effect";
import { EffectControlEffectViewProps } from './prop';

export class EffectControlEffectViewFactory {

  private static map_: Map<string, [any, any]> = new Map();

  static register(name: string, formView: any, timelineView: any) {
    this.map_.set(name, [formView, timelineView]);
  }

  static createFormView(name: string, props: EffectControlEffectViewProps<Effect>) {
    const view = this.map_.get(name)[0];
    return React.cloneElement(view, props);
  }

  static createTimelineView(name: string, props: EffectControlEffectViewProps<Effect>) {
    const view = this.map_.get(name)[1];
    return React.cloneElement(view, props);
  }

}