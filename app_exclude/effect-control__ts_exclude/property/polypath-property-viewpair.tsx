import * as React from 'react'
import { observer } from "window/app-mobx";
import { EffectControlPropertyFormView } from './property-viewpair';
import { Vector2 } from 'oliveutil/vector2';

@observer
export class PolypathPropertyControlView extends EffectControlPropertyFormView<Vector2> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <div className='label-space'>
          <PropertyAnimatedDecorator {...this.props}/>
          <div className='label'>{this.props.label}</div>
        </div>
        <div className='value-space'>
        </div>
      </div>
    )
  }

}