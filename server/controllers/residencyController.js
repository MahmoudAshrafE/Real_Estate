import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { Residency } from "../models/Residency.js";

export const createResidency = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail,
    } = req.body.data;
    try {
        // Find the user by email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const residency = new Residency({
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner: user._id,
        });

        await residency.save();

        res.status(201).json({ message: "Residency created successfully", residency });

        } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error, handle accordingly
            return res
                .status(400)
                .json({ error: "A residency with this address already exists" });
        }

        res.status(500).json({ error: err.message });
    }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
        const residencies = await Residency.find().sort({ createdAt: 'desc' });
        res.status(200).json(residencies);
        } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        }
})

export const getResidency = asyncHandler(async (req, res) => {
    try {
        const residency = await Residency.findById(req.params.id);

        res.status(200).json(residency);
        } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        }
})
