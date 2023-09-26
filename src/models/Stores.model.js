const mongoose = require('mongoose');

const storesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 4
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        minLength: 4
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true,
            trim: true,
            minLength: 4
        },
        longitude: {
            type: Number,
            required: true,
            trim: true,
            minLength: 4
        }
    },
    addressLines: {
        type: [String],
        required: true,
        trim: true,
        minLength: 6
    },
    hours: {
        type: [Number],
        required: true
    }
}, {
    timestamps: true
});