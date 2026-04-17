const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/v2/execute', (req, res) => {
    const { language, files } = req.body;
    const code = files[0].content;
    const fileName = language === 'python' ? 'temp.py' : 'temp.js';
    const command = language === 'python' ? `python3 ${fileName}` : `node ${fileName}`;

    fs.writeFileSync(fileName, code);

    exec(command, (error, stdout, stderr) => {
        res.json({
            run: {
                output: stdout || stderr || error?.message,
                stderr: stderr
            }
        });
        if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
    });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
