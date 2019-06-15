import * as style from './track-side-view.scss';
import * as React from 'react'
import { ITrack } from 'internal/timeline/base/track/track';
import { IProject } from 'internal/project/project';
import { observable } from 'window/app-mobx';

export class TimelineTrackSideView {

  @observable name: string;

  constructor(
    readonly project: IProject,
    readonly track: ITrack
  ) {
    this.calculate();
  }

  private calculate() {
    this.name = this.track.name;
  }

  render(): React.ReactNode {
    return <TimelineTrackSideViewComponent view={this}/>
  }

}

class TimelineTrackSideViewComponent extends React.Component<{view: TimelineTrackSideView}> {

  render() {
    const view = this.props.view;
    const st = {
      height: '30px',
      lineHeight: '30px'
    }
    return (
      <div className={`track ${style.component}`} style={st}>
        <div className='name'>{view.name}</div>
      </div>
    )
  }
  
}