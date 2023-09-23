import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  bookedVisits: [{ type: mongoose.Schema.Types.Mixed }],
  favResidenciesID: [{ type: mongoose.Schema.Types.ObjectId }],
  ownedResidencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Residency' }],
});

export const User = mongoose.model('User', userSchema);
