import { Postable, postable } from 'worker-postable'

import TrackItem from './track-item'
import TrackItemType from './track-item-type';
import { IResource } from 'standard';

@Postable
export default class VideoTrackItem extends TrackItem {

  constructor(resource: IResource) {
    super(TrackItemType.VIDEO);

    this.startTime = 0;
    this.endTime = 3000;
  }

}