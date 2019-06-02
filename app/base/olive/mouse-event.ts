import * as React from 'react'
import { StandardMouseEvent } from 'base/browser/mouseEvent';

// Which HTML element is the target of the event
function mouseTarget(e: any) {
	var targ;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	return targ;
}
 
// Mouse position relative to the document
// From http://www.quirksmode.org/js/events_properties.html
function mousePositionDocument(e: any) {
	var posx = 0;
	var posy = 0;
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return {
		x : posx,
		y : posy
	};
}

// Find out where an element is on the page
// From http://www.quirksmode.org/js/findpos.html
function findPos(obj: any) {
	var curleft = 0; var curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return {
		left : curleft,
		top : curtop
	};
}
 
// Mouse position relative to the element
// not working on IE7 and below
export function mousePositionElement(e: MouseEvent, el: HTMLElement): {x: number, y: number}
export function mousePositionElement(e: React.MouseEvent, el: HTMLElement): {x: number, y: number}
export function mousePositionElement(e: StandardMouseEvent, el: HTMLElement): {x: number, y: number}
export function mousePositionElement(e: any, el: HTMLElement) {
  // MouseEvent || React.MouseEvent
  var mousePosDoc;
  if (e.pageX) mousePosDoc = mousePositionDocument(e);
  else mousePosDoc = e;
  // var target = mouseTarget(e);
  var target = el;
	var targetPos = findPos(target);
	var posx = mousePosDoc.x - targetPos.left;
	var posy = mousePosDoc.y - targetPos.top;
	return {
		x : posx,
		y : posy
	};
}

function elementPositionWindow(el: Element) {
  const clientRect = el.getBoundingClientRect();
  return clientRect;
}

let lastMouseEvent = {
  pageX: 0,
  pageY: 0,
}
let deltaMouseEvent = {
  deltaX: 0,
  deltaY: 0,
}
function updateMouseEvent(e: MouseEvent | React.MouseEvent) {
  deltaMouseEvent.deltaX = e.pageX - lastMouseEvent.pageX;
  deltaMouseEvent.deltaY = e.pageY - lastMouseEvent.pageY;
  lastMouseEvent.pageX = e.pageX;
	lastMouseEvent.pageY = e.pageY;
  return deltaMouseEvent;
}

export function createStandardMouseEvent(e: MouseEvent): StandardMouseEvent;
export function createStandardMouseEvent(e: React.MouseEvent): StandardMouseEvent
export function createStandardMouseEvent(e: any): StandardMouseEvent {
  return new StandardMouseEvent(e as any);
}