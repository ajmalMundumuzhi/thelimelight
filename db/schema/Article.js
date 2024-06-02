// models/User.js
const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
    },
    Author: {
      type: String,
      required: true,
    },
    Institution: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      default: '',
    },
    Content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to update the updatedAt field before saving
articleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Article model
const Article = mongoose.model('Article', articleSchema,'product');
module.exports = Article;
