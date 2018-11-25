const canvas = document.createElement('canvas');
canvas.width = 1920;
canvas.height = 1080;

Renderer.initialize(canvas);

export default {
  element: canvas
};