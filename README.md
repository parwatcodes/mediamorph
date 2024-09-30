# Media Morph

Media Morph is a versatile JavaScript library for processing images and videos using `sharp` and `fluent-ffmpeg`. This package allows you to transform media files into various formats with ease.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Processing Images](#processing-images)
  - [Processing Videos](#processing-videos)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install Media Morph, run the following command:

```bash
npm install mediamorph

async processImage(inputPath, outputFormats);
async processVideo(inputPath, outputFormats);

Examples
Image Processing
Transforming an image from PNG to JPEG and WEBP:

const MediaMorph = require('mediamorph');
const mediaMorph = new MediaMorph();

(async () => {
  try {
    const results = await mediaMorph.processImage('path/to/image.png', ['jpeg', 'webp']);
    console.log('Transformed Images:', results);
  } catch (error) {
    console.error('Error processing image:', error);
  }
})();


Video Processing
Converting a video from MP4 to AVI and MOV:


const MediaMorph = require('my-npm-package');
const mediaMorph = new MediaMorph();

(async () => {
  try {
    const results = await mediaMorph.processVideo('path/to/video.mp4', ['avi', 'mov']);
    console.log('Transformed Videos:', results);
  } catch (error) {
    console.error('Error processing video:', error);
  }
})();
