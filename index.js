
const express = require('express');
const { renderHTMLToFrames } = require('./renderer');
const { mergeWithAudio } = require('./ffmpeg');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/render', async (req, res) => {
  const { htmlUrl, audioPath, outputName } = req.body;
  try {
    const framesDir = await renderHTMLToFrames(htmlUrl);
    const videoPath = await mergeWithAudio(framesDir, audioPath, outputName);
    res.json({ success: true, videoPath });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('FameRender live on port 3000'));
