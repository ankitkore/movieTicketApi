const mongoose = require('mongoose');
const { Schema } = mongoose;

const tblTheatreSchema = new Schema({
    theatreName: {
        type: Schema.Types.String,
        trim: true,
        required: true
    },
    totalScreens: {
        type: Schema.Types.Number,
        trim: true,
        required: true
    },
    state: {
        type: Schema.Types.String,
        trim: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
        trim: true,
        index: -1
    }
});

tblTheatreSchema.index({ theatreName: 1 }, { unique: true });

const tblTheatre = mongoose.model('tblTheatre', tblTheatreSchema, 'tblTheatre');

module.exports = tblTheatre;