import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expiresAt: Date
});

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);  
export default ResetToken;