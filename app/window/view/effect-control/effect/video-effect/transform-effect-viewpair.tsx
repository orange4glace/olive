import * as React from 'react'
import { EffectControlEffectViewProps } from '../prop';
import { TransformEffect } from 'internal/rendering/effect/video-effect/transform-effect';
import { EffectControlEffectFormView } from '../effect-view-pair';
import { EffectControlEffectViewFactory } from '../factory';

export class EffectControlTransformEffectFormView
    extends React.Component<EffectControlEffectViewProps<TransformEffect>, {}> {

  render() {
    const effect = this.props.effect;
    return (
      <EffectControlEffectFormView {...this.props}>
      </EffectControlEffectFormView>
    )
  }

}

export class EffectControlTransformEffectTimelineView
    extends React.Component<EffectControlEffectViewProps<TransformEffect>, {}> {

  render() {
    const effect = this.props.effect;
    return (
      <EffectControlEffectFormView {...this.props}>
      </EffectControlEffectFormView>
    )
  }

}

EffectControlEffectViewFactory.register(
    'Transform',
    EffectControlTransformEffectFormView,
    EffectControlTransformEffectTimelineView);