const express = require('express');
const fs = require('fs');
const path = require('path'); // Import path module
const app = express();
const PORT = 3000;

let dataIdCounter = 1; 

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// // Endpoint for storing data into a local file
// app.post('/data', (req, res) => {
//     const data = req.body.data;
//     if (!data) {
//         return res.status(400).send('Data is required');
//     }
//     fs.appendFile('data.txt', data + '\n', err => {
//         if (err) {
//             console.error('Error writing data:', err);
//             return res.status(500).send('Error writing data');
//         }
//         res.send('Data written successfully');
//     });
// });

// // Endpoint for retrieving stored data
// app.get('/data', (req, res) => {
//     fs.readFile('data.txt', 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading data:', err);
//             return res.status(500).send('Error reading data');
//         }
//         res.send(data);
//     });
// });

// Endpoint for storing data into a local file
app.post('/data', (req, res) => {
    const data = req.body.data;
    if (!data) {
        return res.status(400).send('Data is required');
    }
    fs.appendFile('data.txt', `${data}\n`, err => {
        if (err) {
            console.error('Error writing data:', err);
            return res.status(500).send('Error writing data');
        }
        res.send(`Data written successfully with ID: ${dataIdCounter++}`);
    });
});

// Endpoint for retrieving stored data
app.get('/data', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).send('Error reading data');
        }
        const lines = data.trim().split('\n').map((line, index) => {
            return { id: index + 1, text: line };
        });
        res.json(lines);
    });
});

// Endpoint for deleting data from the file
app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).send('Error reading data');
        }
        const lines = data.trim().split('\n');
        if (id <= 0 || id > lines.length) {
            return res.status(404).send('ID not found');
        }
        // lines[id - 1] += ' X'; // Mark the line for deletion
        lines.splice(id - 1, 1);
        if (lines.length === 0) {
            // If there are no lines left, delete the file
            fs.unlinkSync('data.txt');
            return res.send('Data file deleted');
        }
        fs.writeFile('data.txt', lines.join('\n'), err => {
            if (err) {
                console.error('Error deleting data:', err);
                return res.status(500).send('Error deleting data');
            }
        });
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
