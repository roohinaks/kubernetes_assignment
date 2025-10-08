const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = 3000;


// set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const BACKEND_URL=process.env.BACKEND_URL || 'http://localhost:8000/api/submit';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// render form
app.get('/', (req, res) => {
  res.render('index', { message: null });
});

// handle form submission
app.post('/submit', async (req, res) => {
  const { name, phno, address} = req.body;

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phno, address})
    });

    const data = await response.json();

    res.render('index', { message: data.message });
  } catch (error) {
    console.error(error);
    res.render('index', { message: "Error submitting form" });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});