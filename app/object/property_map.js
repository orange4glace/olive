import Property from 'object/property'

class PropertyMap {

  @mobx.observable
  map = new Map();

  constructor() {
  }

  setProperty(property, value) {
    map.set(Property.indexOf(property), value);
  }

  getProperty(property, value) {
    return map.get(Property.indexOf(property));
  }

}

PropertyMap.interpolate = (lhs, rhs) => {

}

export default PropertyMap;