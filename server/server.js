const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.get('*', (req, res) => { //to be able to render a certain url even after a refresh instead of error 'can't GET /...'
  res.sendFile(path.join(publicPath, 'index.html'));
})
app.listen(port, () => {
  console.log('Server running!');
});
