# Bugs

### Olive
- AudioDecoder memory leak on *seek*

### V8
- WebGL `texImage2D` crashes when using N-API *external* ArrayBuffer

### Electron
- N-API `napi-threadsafe-function` is not firing properly when page is loaded by `loadURL`.
- But when page is reloaded at least once then it suddenly works well.zz