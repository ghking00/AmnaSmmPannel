import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userEmail: String,
  serviceId: String,
  quantity: Number,
  link: String,
  category: String,
  price: Number,
  status: String,
  smmOrderId: String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
