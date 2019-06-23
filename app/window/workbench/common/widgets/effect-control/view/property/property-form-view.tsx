// import * as React from 'react'
// import { Disposable, dispose } from "base/common/lifecycle";
// import { observable, action } from 'mobx';
// import { Property } from 'internal/rendering/property/base/property';
// import { observer } from 'mobx-react';
// import { ITimeline } from 'internal/timeline/base/timeline';
// import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
// import { IKeyframeValue } from 'internal/rendering/property/base/keyframe-value';
// import { EffectControlViewOutgoingEvents } from 'window/workbench/common/widgets/effect-control/view-outgoing-events';

// export abstract class EffectControlPropertyFormView<T extends IKeyframeValue> extends Disposable {

//   private animateButton_: PropertyAnimateButton;
//   public get animateButton() { return this.animateButton_; }

//   @observable private animatable_: boolean;
//   public get animatable() { return this.animatable_; }

//   constructor(
//     readonly name: string,
//     readonly timeline: ITimeline,
//     readonly trackItem: ITrackItem,
//     readonly property: Property<T>,
//     readonly viewOutgoingEvents: EffectControlViewOutgoingEvents) {
//     super();

//     this.updateAnimatable();
//   }

//   @action
//   private updateAnimatable() {
//     if (this.property.animatable === this.animatable) return;
//     dispose(this.animateButton_);
//     if (this.property.animatable) {
//       this.animatable_ = true;
//       this.animateButton_ = new PropertyAnimateButton(this.property);
//     }
//     else {
//       this.animatable_ = false;
//       this.animateButton_ = null;
//     }
//   }

//   protected renderKey(): React.ReactNode {
//     return <KeyComponent view={this}/>
//   }

//   protected renderValue(): React.ReactNode {
//     return null;
//   }

//   render(): React.ReactNode {
//     return <ViewComponent view={this} keyView={this.renderKey()} valueView={this.renderValue}/>
//   }
  
// }

// @observer
// class KeyComponent extends React.Component<{view: EffectControlPropertyFormView<any>}> {

//   render() {
//     const view = this.props.view;
//     return (
//       <>
//         {view.animatable && view.animateButton.render()}
//         <div className='label'>{view.name}</div>
//       </>
//     )
//   }

// }

// @observer
// class ViewComponent extends React.Component<{
//   view: EffectControlPropertyFormView<any>,
//   keyView: React.ReactNode,
//   valueView: React.ReactNode
// }> {

//   render() {
//     const view = this.props.view;
//     return (
//       <div className='property-form'>
//         <div className='key'>
//           {this.props.keyView}
//         </div>
//         <div className='value'>
//           {this.props.valueView}
//         </div>
//       </div>
//     )
//   }

// }



// export class PropertyAnimateButton extends Disposable {

//   @observable private animated_: boolean;
//   public get animated() { return this.animated_; }

//   constructor(
//     private readonly property: Property<any>
//   ) {
//     super();

//     this.animated_ = property.animated;
//     this._register(property.onDidChangeAnimated(val => this.animated_ = val, this));
//   }

//   setAnimated(value: boolean) {
//     this.property.setAnimated(value);
//   }

//   render() {
//     return <PropertyAnimateButtonComponent view={this}/>
//   }

// }

// @observer
// class PropertyAnimateButtonComponent extends React.Component<{view: PropertyAnimateButton}> {

//   handleButtonClick = () => {
//     const view = this.props.view;
//     view.setAnimated(!view.animated);
//   }

//   render() {
//     const view = this.props.view;
//     const css = (view.animated ? 'true' : 'false')
//     return (
//       <div className={`property-animated-button ${css}`} onClick={this.handleButtonClick}>
//       </div>
//     )
//   }
// }