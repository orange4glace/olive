import * as React from 'react'
import { Effect } from 'internal/rendering/effect/effect';
import { EffectControlEffectViewProps } from './prop';

export class EffectControlEffectFormView
    extends React.Component<EffectControlEffectViewProps<Effect>, {}> {

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }

}