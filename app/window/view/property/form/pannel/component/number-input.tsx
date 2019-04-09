import * as React from 'react'
import { observer, observable } from 'window/app-mobx';

import * as style from './number-input.scss'
import ADiv from 'window/view/advanced-div';

interface NumberInputProps {
  value: number;
  onChange: (value: number)=>void;
}

@observer
export class NumberInput extends React.Component<NumberInputProps, {}> {

  @observable editing = false;

  constructor(props: NumberInputProps) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  clickHandler(e: React.MouseEvent) {
    if (!this.editing) this.editing = true;
  }

  blurHandler() {
    this.editing = false;
  }

  changeHandler(e: any) {
    this.props.onChange(+e.target.value);
  }

  mouseMoveStartHandler() {
    return true;
  }

  mouseMoveHandler(e: MouseEvent) {
    this.props.onChange(this.props.value + e.movementX);
  }

  render() {
    return (
      <ADiv className={style.component}
        onClick={this.clickHandler}
        onDocumentMouseMoveStart={this.mouseMoveStartHandler}
        onDocumentMouseMove={this.mouseMoveHandler}>
        { !this.editing && <div className='value'>{this.props.value}</div>}
        { this.editing && <input type='text' pattern='^\d*\.?\d*$' value={this.props.value} onChange={this.changeHandler} onBlurCapture={this.blurHandler} ref={input=>input && input.focus()}></input>}
      </ADiv>
    )
  }

}