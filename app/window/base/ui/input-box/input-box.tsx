import './input-box.scss'
import * as React from 'react'

interface Props {
  value: string;
  onValueChange?: (value: string) => void;
}

export class InputBox extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e: React.ChangeEvent) {
    if (this.props.onValueChange)
      this.props.onValueChange(e.target.nodeValue);
  }

  render() {
    return (
      <div className='input-box'>
        <input value={this.props.value} onChange={this.changeHandler}/>
      </div>
    )
  }

}