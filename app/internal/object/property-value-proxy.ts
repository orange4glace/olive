export default class PropertyValueProxy {
  onEmit: ()=>void;
  emit() {
    this.onEmit();
  }
}