import { Request, Response, Next } from 'restify';
import { spawn } from 'child_process';
import path from 'path';

class ConvertController {
    createFile(req: Request, res: Response, next: Next) {
        const { filename } = req.params;
        const filePath = `src/media/${filename}.txt`;

        if (!filename) {
            res.send(400, { error: 'name not be null' });
            return next();
        }

        const createFileProcess = spawn('touch', [filePath]);

        createFileProcess.on('error', (err) => {
            console.error(`error creating the file: ${err.message}`);
            res.send(500, { error: 'error creating the file' });
            next();
        });

        createFileProcess.on('exit', (code, signal) => {
            if (code === 0) {
                console.log(`File ${filePath} successfully created`);
                res.send(200, { message: `File ${filePath} successfully created` });
            } else {
                console.error(`error creating the file. output: ${code}, signal: ${signal}`);
                res.send(500, { error: 'error creating the file' });
            }
            next();
        });
    }

    convertMp4ToWebm(_req: Request, res: Response, next: Next) {
        const filename = 'vod.mp4';
        const inputPath = path.join(__dirname, '..', 'media/mp4', filename);
        const outputFilename = `${path.parse(filename).name}-converted.webm`;
        const outputPath = path.join(__dirname, '..', 'media/webm', outputFilename);

        const ffmpegProcess = spawn('ffmpeg', [
            '-i',
            inputPath,
            '-c:v',
            'libvpx-vp9',
            '-c:a',
            'libopus',
            outputPath,
        ]);

        ffmpegProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Video conversion completed');
                res.send(200, {
                    message: 'Video conversion completed',
                    timestamp: new Date().toISOString()
                });
            } else {
                console.error('Error converting the video');
                res.send(500, {
                    error: 'Error converting the video',
                    timestamp: new Date().toISOString()
                });
            }
            next();
        });
    }

    convertWebmToMp4(_req: Request, res: Response, next: Next) {
        const filename = 'vod.webm';
        const inputPath = path.join(__dirname, '..', 'media/webm', filename);
        const outputFilename = `${path.parse(filename).name}-converted.mp4`;
        const outputPath = path.join(__dirname, '..', 'media/mp4', outputFilename);

        const ffmpegProcess = spawn('ffmpeg', [
            '-i',
            inputPath,
            '-c:v',
            'libx264',
            '-c:a',
            'aac',
            outputPath,
        ]);

        ffmpegProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Video conversion completed');
                res.send(200, {
                    message: 'Video conversion completed',
                    timestamp: new Date().toISOString()
                });
            } else {
                console.error('Error converting the video');
                res.send(500, {
                    error: 'Error converting the video',
                    timestamp: new Date().toISOString()
                });
            }
            next();
        });
    }

    muteVods(_req: Request, res: Response, next: Next) {
        const mp4Filename = 'vod.mp4';
        const webmFilename = 'vod.webm';
        const mp4InputPath = path.join(__dirname, '..', 'media/mp4', mp4Filename);
        const webmInputPath = path.join(__dirname, '..', 'media/webm', webmFilename);

        const mp4OutputFilename = `${path.parse(mp4Filename).name}-muted.mp4`;
        const webmOutputFilename = `${path.parse(webmFilename).name}-muted.webm`;
        const mp4OutputPath = path.join(__dirname, '..', 'media/mutedvod', mp4OutputFilename);
        const webmOutputPath = path.join(__dirname, '..', 'media/mutedvod', webmOutputFilename);

        const mp4Process = spawn('ffmpeg', [
            '-i',
            mp4InputPath,
            '-c:v',
            'copy',
            '-an',
            mp4OutputPath,
        ]);

        const webmProcess = spawn('ffmpeg', [
            '-i',
            webmInputPath,
            '-c:v',
            'copy',
            '-an',
            webmOutputPath,
        ]);

        let completedCount = 0;

        const checkCompletion = () => {
            completedCount++;
            if (completedCount === 2) {
                console.log('Video muting completed');
                res.send(200, {
                    message: 'Video muting completed',
                    timestamp: new Date().toISOString()
                });
                next();
            }
        };

        mp4Process.on('close', (code) => {
            if (code === 0) {
                checkCompletion();
            } else {
                console.error('Error muting MP4 video');
                res.send(500, {
                    error: 'Error muting MP4 video',
                    timestamp: new Date().toISOString()
                });
                next();
            }
        });

        webmProcess.on('close', (code) => {
            if (code === 0) {
                checkCompletion();
            } else {
                console.error('Error muting WebM video');
                res.send(500, {
                    error: 'Error muting WebM video',
                    timestamp: new Date().toISOString()
                });
                next();
            }
        });
    }
}

export default new ConvertController();