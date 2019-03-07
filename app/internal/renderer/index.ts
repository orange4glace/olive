import { ConstructorStore, postableMessageHandler } from 'worker-postable'
import { EventEmitter2 } from 'eventemitter2'

import Timeline from './timeline'
import Track from './track'
import TrackItem from './track-item'

import { Poster } from 'poster'
import DecoderClient from 'internal/decoder/client'

ConstructorStore.set('Timeline', Timeline);
ConstructorStore.set('Track', Track);
ConstructorStore.set('TrackItem', TrackItem);

const poster = new Poster(self);
const decoderClient = new DecoderClient(poster);
poster.on('post', postableMessageHandler);

console.log('render running')

var ee : EventEmitter2;


import * as node from '../../../nanovg-webgl/build/Release/nanovg_node_webgl.node'
console.log(node)