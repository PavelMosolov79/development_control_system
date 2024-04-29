const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.send("Ok");
});

app.listen(port, () => {
    console.log(`API server listening`);
});