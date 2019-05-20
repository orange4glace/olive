# Bugs

### Olive

### Electron
- N-API `napi-threadsafe-function` is not firing properly when page is loaded by `loadURL`.
- But when page is reloaded at least once then it suddenly works well.

### Renderer
[15504:0521/014249.124:ERROR:gles2_cmd_decoder_autogen.h(270)] [.WebGL-0000022090524180]GL ERROR :GL_INVALID_ENUM : glBlendFuncSeparate: srcRGB was GL_CONTEXT_FLAG_DEBUG_BIT_KHR