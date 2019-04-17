// import * as React from 'react'
// import { observer } from 'window/app-mobx';
// import { Paper } from 'internal/drawing';
// import { PropertyViewDrawingDropDownView, PropertyViewDropDownView } from './component/dropdown-view';
// import { EffectControlDrawingViewProps } from '../props';
// import { Vector2PropertyControlView } from './component/property-control-view';
// import { DrawingType } from 'internal/drawing/drawing-type';

// @observer
// class PaperDrawingFormView extends React.Component<EffectControlDrawingViewProps<Paper>, {}> {

//   constructor(props: EffectControlDrawingViewProps<Paper>) {
//     super(props);
//   }

//   render() {
//     const trackItemHost = this.props.trackItemHost;
//     const drawingHost = this.props.drawingHost;
//     return (
//       <PropertyViewDrawingDropDownView label='Paper' drawingHost={drawingHost}>
//         <Vector2PropertyControlView {...this.props} label={'position'} propertyHost={
//             drawingHost.getPropertyHost(drawingHost.drawing.position)}/>
//         <Vector2PropertyControlView {...this.props} label={'scale'} propertyHost={
//             drawingHost.getPropertyHost(drawingHost.drawing.scale)}/>
//         {
//           drawingHost.drawing.children.forEach(childDrawing => {
//             switch (childDrawing.type) {
//               case DrawingType.
//             }
//           })
//           [...drawingHost.childrenDrawingHosts].map(([child, childHost]) =>
//               createDrawingPropertyView(childHost.drawing.type, {
//                   level: this.props.level + 1,
//                   timeline: this.props.timeline,
//                   trackItemHost: this.props.trackItemHost,
//                   drawingHost: childHost}))
//         }
//       </PropertyViewDrawingDropDownView>
//     )
//   }
// }

// @observer
// class PaperDrawingTimelineView extends React.Component<DrawingViewProps<Paper>, any> {

//   render() {
//     const drawingHost = this.props.drawingHost;
//     const paper = this.props.drawingHost.drawing;
//     const positionPropertyHost = drawingHost.getPropertyHost(paper.position);
//     const scalePropertyHost = drawingHost.getPropertyHost(paper.scale);
//     return (
//       <PropertyViewDropDownView open={drawingHost.open}>
//         <TimelinePropertyView {...this.props} propertyHost={positionPropertyHost}/>
//         <TimelinePropertyView {...this.props} propertyHost={scalePropertyHost}/>
//         {
//           [...drawingHost.childrenDrawingHosts].map(([drawing, childDrawingHost]) => 
//           createDrawingPropertyKeyframeView(drawing.type, {
//             ...this.props,
//             drawingHost: childDrawingHost
//           }))
//         }
//       </PropertyViewDropDownView>
//     )
//   }
// }