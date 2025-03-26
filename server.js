require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Review Schema
const reviewSchema = new mongoose.Schema({
  vehicleName: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  engine: Number,
  tech: Number,
  braking: Number,
  design: Number,
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// API Routes
app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting review' });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cars', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cars.html'));
});

app.get('/bikes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bikes.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/reviews', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reviews.html'));
});

// Vehicle review pages
app.get('/vernareview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'vernareview.html'));
});

app.get('/compassreview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'compassreview.html'));
});

app.get('/jupiterreview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'jupiterreview.html'));
});

app.get('/re350review', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 're350review.html'));
});

// Catch-all route for any other pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 