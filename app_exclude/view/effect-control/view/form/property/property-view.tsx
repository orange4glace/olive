import * as React from 'react'

import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { observer } from 'window/app-mobx';

import * as style from './style.scss';
import { EffectControlWidgetDrawingFormViewProps } from 'window/view/effect-control/view/form/drawing/drawing-view';

export interface EffectControlWidgetPropertyViewProps<T extends EffectControlWidgetPropertyViewModel<any>>
    extends EffectControlWidgetDrawingFormViewProps<any> {
  propertyViewModel: T;
}

@observer
export class EffectControlWidgetPropertyFormViewComponent
    extends React.Component<EffectControlWidgetPropertyViewProps<any>, {}> {
    
  render() {
    const vm = this.props.propertyViewModel;
    const property = vm.property;
    return (
      <div className={style.component}>
          <EffectControlWidgetLabelView {...this.props}/>
          {this.props.children}
      </div>
    )
  }
}

@observer
class EffectControlWidgetLabelView
    extends React.Component<EffectControlWidgetPropertyViewProps<EffectControlWidgetPropertyViewModel<any>>, {}> {

  constructor(props: EffectControlWidgetPropertyViewProps<any>) {
    super(props);
    this.onToggleAnimateClickHandler = this.onToggleAnimateClickHandler.bind(this);
  }

  onToggleAnimateClickHandler(e: React.MouseEvent) {
    this.props.propertyViewModel.toggleAnimated();
  }

  render() {
    const vm = this.props.propertyViewModel;
    const property = vm.property;
    return (
      <div className='label-space'>
        { property.animatable &&
        <div className={`toggle-animate ${property.animated}`} onClick={this.onToggleAnimateClickHandler}></div>
        }
        <div className='label'>
          {vm.name}
        </div>
      </div>
    )
  }

}

export abstract class EffectControlWidgetPropertyFormView<T extends EffectControlWidgetPropertyViewModel<any>>
    extends React.Component<EffectControlWidgetPropertyViewProps<T>, {}> {}