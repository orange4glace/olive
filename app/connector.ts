import { BrowserWindowConstructorOptions } from "electron";

// WindowRequest
// If new Window is needed by Renderer,
// Renderer makes a request to Remote to create a new Window
// Since Window should be same process with App window,
// Renderer creates a native window by window.open first
// and Electron wraps native window into BrowserWindow
// 1. (Renderer) WindowRequest.request('request-window')
// 2. (Remote) Ready for wrap if new native window is created.
//             Send 'request-window-open' message to Renderer
// 3. (Renderer) window.open
// 4. (Remote) Captures window-open event and wraps it into BrowserWindow
// 5. (Remote) Send 'request-window' message to Renderer with created BrowserWindow as data

interface WindowRequestPromise {
  // Promise resolve, reject
  resolve: (result: WindowRequestResult) => void;
  reject: any;
  nativeWindow: Window;
}

interface WindowRequestParam {
  name?: string;
  options?: any;
}

interface WindowRequestResult {
  browserWindow: any; // electron.BrowserWindow
  nativeWindow: Window;
}

interface WindowRequestWrapResult {
  ok: boolean,
  name?: string,
  id?: number
}

interface AppParam {
  resourceWorkerWindowID: number
}

export {
  WindowRequestPromise,
  WindowRequestParam,
  WindowRequestWrapResult,
  WindowRequestResult,
  AppParam
}