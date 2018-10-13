cd "$(dirname "$0")"
HOME=~/.electron-gyp node-gyp configure build --target=4.0.0-beta.2 --arch=x64 --dist-url=https://atom.io/download/electron