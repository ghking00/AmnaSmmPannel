import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);