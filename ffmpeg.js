const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// 👉 Tell fluent-ffmpeg exactly where ffmpeg.exe is
ffmpeg.setFfmpegPath('C:/Users/asian/Downloads/ffmpeg/bin/ffmpeg.exe');

function mergeWithAudio(framesDir, audioPath, outputName) {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(__dirname, 'output', `${outputName}.mp4`);
        ffmpeg()
            .addInput(`${framesDir}/frame%04d.png`)
            .inputFPS(30)
            .addInput(audioPath)
            .outputFPS(30)
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions('-pix_fmt yuv420p')
            .save(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', reject);
    });
}

module.exports = { mergeWithAudio };
