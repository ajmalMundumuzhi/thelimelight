// db.js
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://muhajmal73:mongodb_ajmal_server@cluster0.pwtvatv.mongodb.net/Limelight?retryWrites=true&w=majority'; // replace with your MongoDB URI

mongoose.connect(dbURI, {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
