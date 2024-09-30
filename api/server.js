const express = require('express');
const multer = require('multer');
const MediaMorph = require('mediamorph');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary storage

const mediaMorph = new MediaMorph();

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const outputFormats = req.body.formats.split(',');
        let processedFiles;

        const fileType = path.extname(req.file.originalname).toLowerCase();

        if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileType)) {
            processedFiles = await mediaMorph.processImage(req.file.path, outputFormats);
        } else if (['.mp4', '.mov', '.avi', '.webm'].includes(fileType)) {
            processedFiles = await mediaMorph.processVideo(req.file.path, outputFormats);
        } else {
            return res.status(400).json({ error: 'Unsupported file type' });
        }

        fs.unlinkSync(req.file.path);

        const urls = processedFiles.map(file => `http://localhost:${port}/uploads/${path.basename(file)}`);

        res.json({ urls });
    } catch (error) {
        console.error('Error processing media:', error);
        res.status(500).json({ error: 'Failed to process media' });
    }
});

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
