import * as React from 'react'

import { observer } from "window/app-mobx";
import { VideoRendering } from 'internal/rendering/rendering/video-rendering';
import { EffectControlEffectViewFactory } from '../effect/factory';
import { EffectControlRenderingViewProps } from './props';

@observer
export class EffectControlVideoRenderingFormView
    extends React.Component<EffectControlRenderingViewProps<VideoRendering>, {}> {

  render() {
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    const rendering = this.props.rendering;
    return (
      <div>
        {rendering.effects.map(effect => EffectControlEffectViewFactory.createFormView(effect.name, {...this.props, effect}))}
      </div>
    )
  }

}