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

const ProjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  thumbnail: String,
  elements: [elementSchema],
}, {
  timestamps: true,
});

const ProjectModel = model('Project', ProjectSchema);
module.exports = ProjectModel;
