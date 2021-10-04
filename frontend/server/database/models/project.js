const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const projectSchema = new Schema( {
  title: { type: String, required: true, maxlength: 128, },
  company: { type: String, required: true, maxlength: 64, },
  companyWebsite: { type: String, required: true, maxlength: 64, },
  location: { type: String, required: true, maxlength: 64, },
  jobTitle: { type: String, required: true,  },
  description: { type: String, required: true,  },
  startDate: { type: Date, required: true,  },
  endDate: { type: Date, required: false, },
  createdAt: { type: Date, default: Date.now(), },
  user: { type: Schema.Types.ObjectId, ref: 'User', },
} );

module.exports = mongoose.model( 'Project', projectSchema );