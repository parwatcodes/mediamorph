const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

class MediaMorph {
  async processImage(inputPath, outputFormats) {
    const results = [];

    if (!outputFormats.length) {
      // return a error
    }

    for (const format of outputFormats) {
      const outputPath = `${inputPath.split('.')[0]}.${format}`;

      await sharp(inputPath)
        .toFormat(format)
        .toFile(outputPath);
      results.push(outputPath);
    }

    return results;
  }

  async processVideo(inputPath, outputFormats) {
    const results = [];

    for (const format of outputFormats) {
        const outputPath = `${inputPath.split('.')[0]}.${format}`;

        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .toFormat(format)
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });
        results.push(outputPath);
    }

    return results;
  }
}

module.exports = MediaMorph;
