import { ConstructorStore, postableMessageHandler, ObjectStore } from 'worker-postable'
import { EventEmitter2 } from 'eventemitter2'

import NVG from '../../../nanovg-webgl';
import { TimelineRenderer } from './timeline';
import { renderer } from './renderer';

console.log('render running')
console.log(ObjectStore,ConstructorStore);

renderer;