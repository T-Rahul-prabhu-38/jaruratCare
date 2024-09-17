const express = require('express');
const connectDB = require('./config/mongoose.js');
const servicesRouter = require('./routes/services.js');

const app = express();
const PORT = 8000;

connectDB();

app.use(express.json());
app.use('/api/services', servicesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));