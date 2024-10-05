require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const adminRoute = require('./router/admin-router');
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// CORS options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dnr4dyguu',
    api_key: '222694227484929',
    api_secret: 'b876mAQ47KjmLcKBQoy05PX0WKI',
    secure: true,
});

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in Cloudinary
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed file formats
    },
});

// Create the multer instance
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware configuration
app.use(cors(corsOptions));  // Apply CORS middleware before routes
app.use(express.json());

// Example route for uploading an image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.status(200).json({ imageUrl: req.file.path });
    } else {
        res.status(400).json({ error: 'Image upload failed' });
    }
});

// Mount the routers
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
