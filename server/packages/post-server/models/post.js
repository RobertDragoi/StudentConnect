const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Object,
  },
  description: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    default: '',
  },
  workHours: {
    type: Number,
  },
  experience: {
    type: String,
  },
  workPlace: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

postSchema.plugin(mongooseFuzzySearching, {
  fields: ['experience', 'domain', 'description', 'title', 'workPlace'],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
