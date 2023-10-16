const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000; // Change this to your desired port
app.use(cors({ origin: '*' }));
app.get('/getKML', (req, res) => {
  const filePath = './kml_files/esfahan.kml';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'application/xml'); // Set the response content type
      res.send(data);
    }
  });
});
app.get('/get_zone', (req, res) => {
  const zonenumber = req.query.zonenumber; // Get the value from the query parameter

  if (!zonenumber) {
    res.status(400).send('Missing myvar parameter');
    return;
  }

  const filePath = `./manategh/${zonenumber}.kml`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'application/xml'); // Set the response content type
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
