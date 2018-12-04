import React from 'react';
 
import { LayoutDirection, LayoutViewDirection } from './layout_direction';

const DNDDirection = {
  CENTER: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFT: 4,
}

@observer
class View extends React.Component {

  constructor(props) {
    super(props);
  }

  generateSide(direction, wrapperStyle, overlayStyle, edgeStyle, skinStyle) {
    return (
      <div className={`place side ${direction}`} style={wrapperStyle}>
        <div className='overlay' style={overlayStyle} onClick={()=>console.log(123)}>
          <div className='corner1' style={edgeStyle}/>
          <div className='corner2' style={edgeStyle}/>
        </div>
        <div className='skin' style={skinStyle}></div>
      </div>
    )
  }
  generateCenter(dndCenterStyle) {
    return (
      <div className='place center' style={dndCenterStyle}>
        <div className='overlay'/>
        <div className='skin'/>
      </div>
    )
  }
  dndMouseEnterHandler(e, direction) {
    const layout = this.props.layout;
    switch (direction) {
    case DNDDirection.TOP:
      if (layout.direction == LayoutDirection.VERTICAL) {

      }
    break;
    }
  }

  render() {
    const windows = this.props.windows;
    const activeWindow = windows[0];

    var dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle,
        dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle,
        dndTopSkinBorderStyle, dndTopSkinStyle, dndBottomSkinStyle,
        dndLeftSkinStyle, dndRightSkinStyle,
        dndCenterStyle, dndCenterSkinStyle;
    if (this.props.dnd) {
      dndHorizontalWrapStyle = {
        height: this.props.dnd.side + 'px'
      }
      dndHorizontalStyle = {
        left: this.props.dnd.side + 'px',
        right: this.props.dnd.side + 'px',
        height: this.props.dnd.side + 'px'
      }
      dndVerticalWrapStyle = {
        width: this.props.dnd.side + 'px'
      }
      dndVerticalStyle = {
        top: this.props.dnd.side + 'px',
        bottom: this.props.dnd.side + 'px',
        width: this.props.dnd.side + 'px'
      }
      dndEdgeStyle = {
        width: this.props.dnd.side * 1.414 + 'px',
        height: this.props.dnd.side * 1.414 + 'px',
      }
      dndTopSkinStyle = {
        borderTopWidth: `${this.props.dnd.side}px`,
        borderLeftWidth: `${this.props.dnd.side}px`,
        borderRightWidth: `${this.props.dnd.side}px`,
        width: this.props.dnd.width + 'px',
        height: 0
      }
      dndTopSkinBorderStyle = {
        borderTopWidth: `${this.props.dnd.side + 1}px`,
        borderLeftWidth: `${this.props.dnd.side + 1}px`,
        borderRightWidth: `${this.props.dnd.side + 1}px`,
        width: this.props.dnd.width + 'px',
        height: 0
      }
      dndBottomSkinStyle = {
        borderBottomWidth: `${this.props.dnd.side}px`,
        borderLeftWidth: `${this.props.dnd.side}px`,
        borderRightWidth: `${this.props.dnd.side}px`,
        width: this.props.dnd.width + 'px',
        height: 0
      }
      dndLeftSkinStyle = {
        borderLeftWidth: `${this.props.dnd.side}px`,
        borderTopWidth: `${this.props.dnd.side}px`,
        borderBottomWidth: `${this.props.dnd.side}px`,
        width: 0,
        height: this.props.dnd.height + 'px',
      }
      dndRightSkinStyle = {
        borderRightWidth: `${this.props.dnd.side}px`,
        borderTopWidth: `${this.props.dnd.side}px`,
        borderBottomWidth: `${this.props.dnd.side}px`,
        width: 0,
        height: this.props.dnd.height + 'px',
      }
      dndCenterStyle = {
        left: this.props.dnd.side + 'px',
        right: this.props.dnd.side + 'px',
        top: this.props.dnd.side + 'px',
        bottom: this.props.dnd.side + 'px'
      }
    }
    return (
      <React.Fragment>
        <div className='view-tabs'>
          {
            windows.map(view =>
              <div className='tab' onMouseDown={e=>{console.log('mousedown')}}>{view.name}</div>
            )
          }
        </div>
        <div className='dnd-place'>
          <div className='tab'></div>
          <div className='con'>
            {this.generateSide('top', dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle, dndTopSkinStyle)}
            {this.generateSide('bottom', dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle, dndBottomSkinStyle)}
            {this.generateSide('left', dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle, dndLeftSkinStyle)}
            {this.generateSide('right', dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle, dndRightSkinStyle)}
            {this.generateCenter(dndCenterStyle)}
          </div>
        </div>
        {React.cloneElement(activeWindow.component, {
          layoutEventListener: this.props.layoutEventListener
        })}
      </React.Fragment>
    )
  }
  
}

export default View;