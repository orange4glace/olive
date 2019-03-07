function addMouseMoveHoldEventListener(el: Element | Document, callback: (e: MouseEvent)=>void, mouseupCallback?: (e: MouseEvent)=>void) {
  const remover = (e: MouseEvent) => {
    if (mouseupCallback) mouseupCallback(e);
    el.removeEventListener('mousemove', callback);
    el.removeEventListener('mouseup', remover);
  }
  el.addEventListener('mousemove', callback);
  el.addEventListener('mouseup', remover);
}

export default {
  addMouseMoveHoldEventListener
}