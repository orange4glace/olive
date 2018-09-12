import React from 'react';
import ReactDOM from 'react-dom';

const addon = window.require('C:/Users/Orange/Documents/olive/src/build/Release/module.node');
console.log(addon);
const path = window.require('path');
console.log(path.dirname(__filename))

import Timeline from 'classes/timeline';
import TimelineLayer from 'classes/timeline_layer';
import TimelineItem from 'classes/timeline_item';

ReactDOM.render(<div/>, document.getElementById('app'));