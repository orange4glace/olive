import React from 'react';

import PropertyPannelControl from 'windows/property/pannel/component/property_pannel_control';
import PropertyPannelLabel from 'windows/property/pannel/component/label';
import PropertyPannelIntegerSlider from 'windows/property/pannel/component/integer_slider';

const _Property = {
  'Transform': [
    ['WIDTH',
    <PropertyPannelControl>
      <PropertyPannelLabel>WIDTH</PropertyPannelLabel>
      <PropertyPannelIntegerSlider/>
    </PropertyPannelControl>],
    ['HEIGHT',
    <PropertyPannelControl>
      <PropertyPannelLabel>HEIGHT</PropertyPannelLabel>
      <PropertyPannelIntegerSlider/>
    </PropertyPannelControl>],
    ['POSITION',
    <PropertyPannelControl>
      <PropertyPannelLabel>WIDTH</PropertyPannelLabel>
      <PropertyPannelIntegerSlider/>
    </PropertyPannelControl>]
  ]
};

const Property = {
  Array: (arr) => arr,
  indexMap: {},
  indexOf: prop => Property.indexMap[prop],
};

var _nextGroupId = 0;
var _nextPropertyId = 0;

for (var propertyGroup in _Property) {
  if (_Property.hasOwnProperty(propertyGroup)) {
    var groupId = _nextGroupId++;
    var obj = {};
    var properties = _Property[propertyGroup];
    properties.forEach(prop => obj[prop[0]] = {
      id: _nextPropertyId++,
      groupId: groupId,
      group: propertyGroup,
      name: prop[0],
      dom: prop[1]
    });
    Property[propertyGroup] = obj;
  }
}

Property.define = function(arr) {
  return arr;
}

export default Property;