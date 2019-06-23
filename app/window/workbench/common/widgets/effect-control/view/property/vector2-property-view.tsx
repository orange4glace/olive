import * as React from 'react'
import { EffectControlPropertyView } from "window/workbench/common/widgets/effect-control/view/property/property-view";
import { Vector2KeyframeValue } from "internal/rendering/property/base/vector2-property";
import { NumberInput } from 'window/base/number-input';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class EffectControlVector2PropertyView extends EffectControlPropertyView<Vector2KeyframeValue> {

  @observable private valueX_: number;
  public get valueX() { return this.valueX_; }
  @observable private valueY_: number;
  public get valueY() { return this.valueY_; }

  onDidUpdateKeyframeValue(): void {
    const property = this.property;
    const timeOffset = this.trackItem.getTimeoffset(this.timeline.currentTime);
    const value = property.getInterpolatedPropertyValue(timeOffset);
    this.valueX_ = value.x;
    this.valueY_ = value.y;
  }

  setValueX(val: number): void {
    const property = this.property;
    const timeOffset = this.trackItem.getTimeoffset(this.timeline.currentTime);
    const currentValue = property.getInterpolatedPropertyValue(timeOffset);
    const value = property.createValue(val, currentValue.y);
    property.addKeyframeAt(timeOffset, value);
  }

  setValueY(val: number): void {
    const property = this.property;
    const timeOffset = this.trackItem.getTimeoffset(this.timeline.currentTime);
    const currentValue = property.getInterpolatedPropertyValue(timeOffset);
    const value = property.createValue(currentValue.x, val);
    property.addKeyframeAt(timeOffset, value);
  }

  renderValueForm() {
    return <ValueFormViewComponent view={this}/>
  }

}

@observer
class ValueFormViewComponent extends React.Component<{view: EffectControlVector2PropertyView}> {

  handleValueXChange = (val: number) => {
    const view = this.props.view;
    view.setValueX(val);
  }

  handleValueYChange = (val: number) => {
    const view = this.props.view;
    view.setValueY(val);
  }

  render() {
    const view = this.props.view;
    return (
      <>
        <NumberInput value={view.valueX} onChange={this.handleValueXChange}/>
        <NumberInput value={view.valueY} onChange={this.handleValueYChange}/>
      </>
    )
  }

}