import { observable } from 'mobx';

class TimelineLayer {
  native;
  
  id;
  @observable items = [];
}

export default TimelineLayer;