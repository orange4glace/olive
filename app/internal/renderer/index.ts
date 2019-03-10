import { ConstructorStore, postableMessageHandler, ObjectStore } from 'worker-postable'
import { EventEmitter2 } from 'eventemitter2'

import { Poster } from 'poster'
import DecoderClient from 'internal/decoder/client'
import NVG from '../../../nanovg-webgl';
import { TimelineRenderer } from './timeline';

// Force-import to fire @Posted
require('./timeline')
require('./drawing')

const poster = new Poster(self);
const decoderClient = new DecoderClient(poster);
poster.on('post', postableMessageHandler);
poster.on('timeline', initTimeline);
poster.on('canvas', initNanovg);
console.log('render running')
console.log(ObjectStore);

var ee : EventEmitter2;

function initTimeline(id: number) {
  timeline = ObjectStore.get(id);
  console.log('root',timeline)
}

function initNanovg(canvas: HTMLCanvasElement) {
  console.log(canvas)
  const nanovg = require(`../../../nanovg-webgl/build/Release/nanovg_node_webgl.node`);
  gl = canvas.getContext('webgl2');
  vg = nanovg.initNanoVG(gl);


  setInterval(()=>console.log(timeline.draw(vg)), 1000)
}

let timeline: TimelineRenderer;
let vg: any;
var gl: any;
