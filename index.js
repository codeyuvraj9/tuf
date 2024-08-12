const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db'); 
const path = require("path");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Get banner settings
app.get('/api/getbanner', (req, res) => {
  connection.query('SELECT * FROM Banner WHERE id = 1', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    res.send(results[0]);
  });
});

// Update banner settings
app.post('/api/updatebanner', (req, res) => {
  const { isVisible, description, timer, link } = req.body;
  connection.query(
    'UPDATE Banner SET isVisible = ?, description = ?, timer = ?, link = ? WHERE id = 1',
    [isVisible, description, timer, link],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ message: 'Banner settings updated' });
    }
  );
});

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});