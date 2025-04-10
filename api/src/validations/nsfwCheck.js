const nsfw = require('nsfwjs');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

let model = null;

async function loadModel() {
  if (!model) {
    model = await nsfw.load();
  }
  return model;
}

async function isNSFWImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const image = tf.node.decodeImage(imageBuffer, 3);

  const model = await loadModel();
  const predictions = await model.classify(image);
  image.dispose();

  const threshold = 0.7;
  const nsfwLabels = ['Porn', 'Sexy', 'Hentai'];

  return predictions.some(pred =>
    nsfwLabels.includes(pred.className) && pred.probability >= threshold
  );
}

module.exports = { isNSFWImage };
