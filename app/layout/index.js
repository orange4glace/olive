import React from 'react'
 
const LayoutDirection = {
  VIEW: 0,
  HORIZONTAL: 1,
  VERTICAL: 2
}
 
class Layout extends React.Component {
 
  constructor(props) {
    this.state = {
      direction: LayoutDirection.VIEW,
      children: []
    };
  }
 
  AddChild(layout, index, direction) {
    const children = this.state.children;
    this.setState({
      children: [...children.slice(0, Math.max(0, index)),
                 layout,
                 ...children.slice(index, children.length)]
    });
  }
 
  render() {
    return (
      this.state.direction == VIEW ?
        React.cloneElement(this.props.view) :
    )
  }
 
}