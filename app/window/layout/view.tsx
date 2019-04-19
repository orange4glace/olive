import * as React from 'react';
import app from 'internal/app';
 
import { LayoutDirection, LayoutViewDirection, LayoutDirectionUtil,LayoutViewDirectionUtil } from './layout-direction';

import LayoutDND from 'window/layout/global/layout-dnd';
import { Widget } from 'window/view/widget';
import { observable } from 'window/app-mobx';

const DNDDirection = {
  CENTER: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFT: 4,
}

var k = 0;

interface ViewProps {
  dnd: any;
  windows: any;
  layout: any;
  layoutEventListener: any;
}

@app.mobx.observer
class View extends React.Component<ViewProps, {}> {

  @observable focusedWidgetIndex = 0;

  constructor(props: any) {
    super(props);

    this.state = {
      id: k ++,
      components: {},
      componentCount: 0
    }

    this.tabMouseDownHandler = this.tabMouseDownHandler.bind(this);
    this.tabMouseUpHandler = this.tabMouseUpHandler.bind(this);
  }

  generateSide(direction: LayoutViewDirection, wrapperStyle: any, overlayStyle: any, edgeStyle: any, skinStyle: any) {
    return (
      <div className={`place side ${LayoutViewDirectionUtil.toString(direction)}`} style={wrapperStyle}
        onMouseEnter={e=>this.dndMouseEnterHandler(e, direction)}
        onMouseLeave={e=>this.dndMouseLeaveHandler(e, direction)}>
        <div className='overlay' style={overlayStyle} onClick={()=>console.log(123)}>
          <div className='corner1' style={edgeStyle}/>
          <div className='corner2' style={edgeStyle}/>
        </div>
        <div className='skin' style={skinStyle}></div>
      </div>
    )
  }
  generateCenter(dndCenterStyle: any) {
    return (
      <div className='place center' style={dndCenterStyle}>
        <div className='overlay'/>
        <div className='skin'/>
      </div>
    )
  }
  dndMouseEnterHandler(e: React.MouseEvent, direction: LayoutViewDirection) {
    LayoutDND.setTargetLayout(this.props.layout);
    LayoutDND.setTargetDirection(direction);
    console.log('mouse enter', direction);
  }
  dndMouseLeaveHandler(e: React.MouseEvent, direction: LayoutViewDirection) {
    console.log('mouse leave', direction);
  }

  tabMouseDownHandler(widget: any) {
    LayoutDND.setHostLayout(this.props.layout);
    LayoutDND.setTargetView(widget);
    document.addEventListener('mouseup', this.tabMouseUpHandler);
  }

  tabMouseUpHandler() {
    LayoutDND.drop();
    LayoutDND.setTargetView(null);
    document.removeEventListener('mouseup', this.tabMouseUpHandler);
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
    const focusedWidget: Widget = this.props.windows[this.focusedWidgetIndex];
    return (
      <React.Fragment>
        <div className='view-tabs'>
          {
            windows.map((widget: Widget) => {
              return <div className='tab' key={widget.id}
                          onMouseDown={()=>this.tabMouseDownHandler(widget)}>{widget.name}</div>
            })
          }
        </div>
        <div className='dnd'>
          <div className='inner'>
            <div className='tab'></div>
            <div className='con'>
              {this.generateSide(LayoutViewDirection.TOP, dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle, dndTopSkinStyle)}
              {this.generateSide(LayoutViewDirection.BOTTOM, dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle, dndBottomSkinStyle)}
              {this.generateSide(LayoutViewDirection.LEFT, dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle, dndLeftSkinStyle)}
              {this.generateSide(LayoutViewDirection.RIGHT, dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle, dndRightSkinStyle)}
              {this.generateCenter(dndCenterStyle)}
            </div>
          </div>
        </div>
        <div className='window'>
          { focusedWidget.render() }
        </div>
      </React.Fragment>
    )
  }
  
}

export default View;