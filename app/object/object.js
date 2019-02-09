import PropertyTimeline from 'object/property_timeline'

var next_object_id = 0;

class CanvasObject {

  id;
  type;
  availableProperties;
  propertyTimelines = [];
  propertyGroups = {};

  constructor(type) {
    this.type = type;
    this.id = next_object_id++;
  }
  
  Serialize(){}
  Deserialize(serialized){}

  enableProperty(property) {
    var propertyTimeline = new PropertyTimeline();
    var group = this.propertyGroups[property.group] || []
    group.push({
      property: property,
      timeline: propertyTimeline
    })
    this.propertyGroups[property.group] = group;
    console.log(this.propertyGroups[property.group]);
  }

  enableProperties(proeprties) {
    proeprties.forEach(e=>this.enableProperty(e));
  }

  getPropertyTimeline(property) {
    return this.propertyTimelineMap[property];
  }

  getAvailableProperties() {
    return this.availableProperties;
  }
}

CanvasObject.property = Property.define([
  {
    group: 'transform',
    property: [
      {
        name: 'position',
        control: (
          <Property>
            <PropertyColumn>
              <PropertyLabel></PropertyLabel>
              <PropertyIntegerSlider/>
            </PropertyColumn>
          </Property>
        )
      }
    ]
  }
])

export default CanvasObject;