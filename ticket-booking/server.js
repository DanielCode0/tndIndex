const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public_html/ticket-booking')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/ticket-booking', 'index.html'));
});

app.post('/send-email', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Email sent successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
