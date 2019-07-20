const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

TagSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Tag", TagSchema);
