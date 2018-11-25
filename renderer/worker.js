let basepath;
let module;

var canvas;
var gl = null;
var texture;

var renderBuffer;

onmessage = function(e) {
  let data = e.data;
  if (data.type == 'init') {
    basepath = data.basepath;
    module = require(`${basepath}/renderer/build/Release/olive_renderer_module.node`);
    
    canvas = data.canvas;
    gl = canvas.getContext("webgl2");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    webGLStart();
  }
  if (data.type == 'render') {
    console.assert(gl != null, "[Renderer] render failed. gl is null");
    var t1 = Date.now();
    var snapshots = data.snapshots;
    var buffer;
    for (var i = 0; i < snapshots.length; i ++) {
      var snapshot = snapshots[i];
      videoFrameData = module.AsVideoFrameData(snapshot.data);
    }
    renderBuffer = new Uint8Array(videoFrameData.data);
    // renderBuffer = new Uint8Array(renderBuffer);
    console.log("Draw scene AFTER DATA ", Date.now() - t1, videoFrameData.pts);
    setTexture(renderBuffer);
    console.log("Draw scene AFTER SET TEXTURE ", Date.now() - t1, videoFrameData.pts);
    drawScene();
    console.log("Draw scene AFTER DRAW", Date.now() - t1, videoFrameData.pts);
    postMessage({
      type: 'rendered'
    });
  }
}

const SHADER_FS = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;

  void main(void) {
    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  }
`

const SHADER_VS = `
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  varying vec2 vTextureCoord;

  void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
  }
`

function webGLStart() {
  initShaders();
  initBuffers();
  initTexture();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;
var squareVertexTextureCoordBuffer;

function initBuffers() {
  triangleVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
  var vertices = [
    0.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  triangleVertexPositionBuffer.itemSize = 3;
  triangleVertexPositionBuffer.numItems = 3;

  squareVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
  vertices = [
        1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
        1.0, -1.0,  0.0,
      -1.0, -1.0,  0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  squareVertexPositionBuffer.itemSize = 3;
  squareVertexPositionBuffer.numItems = 4;

  squareVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
  var textureCoords = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
  squareVertexTextureCoordBuffer.itemSize = 2;
  squareVertexTextureCoordBuffer.numItems = 4;

}

function drawScene() {
  // setTexture(renderBuffer);

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, squareVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(shaderProgram.samplerUniform, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}

var shaderProgram;
function initShaders() {
  console.log("[Renderer] Init shader..");
  var fragmentShader = getShader(gl, gl.FRAGMENT_SHADER, SHADER_FS);
  var vertexShader = getShader(gl, gl.VERTEX_SHADER, SHADER_VS);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Could not initialize shaders");
  }

  gl.useProgram(shaderProgram);

  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

  shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
  console.log("[Renderer] Init shader!");
}

function initTexture() {
  texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}


function setTexture(buffer) {
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1920, 1080, 0, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
}


function getShader(gl, shaderType, shaderString) {
  str = shaderString

  var shader;
  shader = gl.createShader(shaderType);

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
  }

  return shader;
}


postMessage({
  type: 'rendered',
  snapshots: []
});