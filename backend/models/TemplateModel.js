const { Schema, model } = require('mongoose');

const elementSchema = new Schema({
  id: Number,
  type: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  fill: String,
  color: String,
  opacity: Number,
  rotation: Number,
  fontSize: Number,
  fontFamily: String,
  text: String,
  textAlign: String,
}, { _id: false });

const TemplateSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  thumbnail: String,
  elements: [elementSchema],
}, {
  timestamps: true,
});

const TemplateModel = model('Template', TemplateSchema);
module.exports = TemplateModel;
