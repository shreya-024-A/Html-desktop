 const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  membershipId: {
    type: String,
    required: true,
    unique: true
  },
  membershipType: {
    type: String,
    enum: ['Student', 'Faculty', 'Staff', 'General'],
    default: 'General'
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', MemberSchema);