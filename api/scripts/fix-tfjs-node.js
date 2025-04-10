const fs = require('fs');
const path = require('path');

const dllSource = path.resolve(__dirname, '../node_modules/@tensorflow/tfjs-node/deps/lib/tensorflow.dll');
const dllTargetDir = path.resolve(__dirname, '../node_modules/@tensorflow/tfjs-node/lib/napi-v8');
const dllTarget = path.join(dllTargetDir, 'tensorflow.dll');

if (!fs.existsSync(dllSource)) {
  console.error('tensorflow.dll not found. Did you install tfjs-node?');
  process.exit(1);
}

if (!fs.existsSync(dllTargetDir)) {
  fs.mkdirSync(dllTargetDir, { recursive: true });
}

fs.copyFileSync(dllSource, dllTarget);
console.log('✅ tensorflow.dll copied to tfjs-node/lib/napi-v8 successfully');
