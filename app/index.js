import React from 'react';
import ReactDOM from 'react-dom';

import Timeline from './timeline/timeline.js';
import TimelineItem from './timeline/timeline-item.js';

const item = new TimelineItem();

window.item = item;
ReactDOM.render(<Timeline timeline={item}></Timeline>, document.getElementById('app'));