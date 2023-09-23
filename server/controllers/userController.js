import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";

export const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        // Check if a user with the given email already exists
        const userExists = await User.findOne({ email });

        if (!userExists) {
            // If the user does not exist, create a new user
            const user = new User(req.body);
            await user.save();

            res.status(201).json({
                message: "User registered successfully",
                user: user,
            });
        } else {
            res.status(201).json({ message: "User already registered" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export const bookVisit = asyncHandler( async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!date) {
      return res.status(404).json({ message: 'put a date' });
    }

    const alreadyBooked = user.bookedVisits.some((visit) => visit.id.toString() === id);

    if (alreadyBooked) {
      return res.status(400).json({ message: 'This residency is already booked by you' });
    }

    user.bookedVisits.push({ id, date });
    await user.save();

    res.status(200).json({ message: 'Your visit is booked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).populate('bookedVisits.id');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookings = user.bookedVisits;

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const result = await User.updateOne(
      { email },
      { $pull: { bookedVisits: { id } } }
    );

    return res.send("Booking cancelled successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isAlreadyInFavorites = user.favResidenciesID.includes(rid);

    const updatedUser = isAlreadyInFavorites
      ? await User.findOneAndUpdate(
          { email },
          { $pull: { favResidenciesID: rid } },
          { new: true }
        )
      : await User.findOneAndUpdate(
          { email },
          { $push: { favResidenciesID: rid } },
          { new: true }
        );

    return res.send({
      message: isAlreadyInFavorites ? "Removed from favorites" : "Updated favorites",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const allFav = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).populate('favResidenciesID');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favResidenciesID = user.favResidenciesID;

    res.status(200).json({favResidenciesID});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

import sgMail  from '@sendgrid/mail' ;// Import the SendGrid library


sgMail.setApiKey('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');

export const contact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  // Compose the email
  const msg = {
    to: 'mamoestate@gmail.com', // Receiver's email
    from: email, // Sender's email (must be a verified sender in SendGrid)
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  // Send the email using SendGrid
  try {
    await sgMail.send(msg);
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email. Please try again later.' });
  }
});
