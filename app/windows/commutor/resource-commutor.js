class ResourceCommutor {

  constructor() {
    this.data = null;
  }

  setData(resource) {
    this.data = resource;
  }

  getData(resource) {
    return this.data;
  }

}

const Commutor = new ResourceCommutor();
console.log(Commutor)
export default Commutor;