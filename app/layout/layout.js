import React from 'react';

import style from './layout.scss';
 
const LayoutDirection = {
  VIEW: "VIEW",
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL"
}
 
class Layout extends React.Component {
 
  render() {
    console.log(this.props);
    return (
      <div className={`${style.component} ${this.props.direction} layout`}>
      {
        this.props.direction == LayoutDirection.VIEW ?
        this.props.views.map(view => view) :
        this.props.children.map(child => (
          <Layout direction={child.direction} children={child.children} views={child.views}/>
        ))
      }
      </div>
    )
  }
 
}

export default Layout