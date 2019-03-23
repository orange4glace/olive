function addMouseMoveHoldEventListener(el: Element | Document, callback: (e: MouseEvent)=>void, mouseupCallback?: (e: MouseEvent)=>void) {
  const remover = (e: MouseEvent) => {
    if (mouseupCallback) mouseupCallback(e);
    el.removeEventListener('mousemove', callback);
    el.removeEventListener('mouseup', remover);
  }
  el.addEventListener('mousemove', callback);
  el.addEventListener('mouseup', remover);
}

function stopPropagation(e: MouseEvent | React.MouseEvent | KeyboardEvent | React.KeyboardEvent) {
  e.stopPropagation();
}

export default {
  addMouseMoveHoldEventListener,
  stopPropagation
}