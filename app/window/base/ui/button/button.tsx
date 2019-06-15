import './button.scss'
import * as React from 'react'

interface Props {
  label: string;
  onClick?: () => void;
}

export class Button extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (this.props.onClick)
      this.props.onClick();
  }

  render() {
    return (
      <div className='button' onClick={this.clickHandler}>
        {this.props.label}
      </div>
    )
  }

}