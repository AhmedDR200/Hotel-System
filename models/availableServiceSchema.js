const mongoose = require('mongoose');

const availableServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a service name'],
        unique: true,
        trim: true,
    }
},{
    timestamps: true,
    versionKey: false
});

const Service = mongoose.model('Service', availableServiceSchema);
module.exports = Service;