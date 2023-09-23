import mongoose from 'mongoose';


const residencySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    address: String,
    city: String,
    country: String,
    image: String,
    facilities: mongoose.Schema.Types.Mixed,
    userEmail: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  });

export const Residency = mongoose.model('Residency', residencySchema);


