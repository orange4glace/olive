import { observable } from 'mobx';

class Timeline {
  native;
  
  @observable layers = [];
}

export default Timeline;