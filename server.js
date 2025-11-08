const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB
mongoose.connect('mongodb://localhost:27017/libraryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Routes
const authRoutes = require('./routes/authroutes');
app.use('/api/auth', authRoutes);

const bookRoutes = require('./routes/bookroutes');
app.use('/api/books', bookRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.redirect('/login.html');
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
