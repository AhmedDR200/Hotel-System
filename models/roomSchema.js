const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a room name'],
        unique: true,
        trim: true,
    },
    images: {
        type: [String],
        minleangth: 1,
        maxleangth: 5,
    },
    location: {
        floor: {
            type: String,
            required: [true, 'Please add a floor']
        },
        roomNumber: {
            type: String,
            required: [true, 'Please add a room number']
        },
        wing : {
            type: String,
            required: [true, 'Please add a wing']
        }
    },
    nightPrice: {
        type: Number,
        required: [true, 'Please add a night price'],
        min: [0, 'Price can not be less then 0'],
    },
    capacity: {
        type: Number,
        required: [true, 'Please add a capacity'],
        min: [1, 'Capacity can not be less then 1'],
    },
    availableServices: {
        type: mongoose.Schema.ObjectId,
        ref: 'Service',
        required: true
    },
    notes: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
    versionKey: false
});

// Middleware to populate user and services
roomSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name'
    }).populate({
        path: 'availableServices',
        select: 'name'
    });
    next();
});


const Room = mongoose.model('Room', roomSchema);
module.exports = Room;