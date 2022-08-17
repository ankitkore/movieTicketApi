const mongoose = require('mongoose');
const { Schema } = mongoose;


const tblShowsSchema = new Schema({
    screenId: {
        type: Schema.Types.Number,
        trim: true,
        required: true
    },
    showName: {
        type: Schema.Types.String,
        trim: true,
        required: true
    },
    tickets: {
        type: Schema.Types.Number,
        trim: true,
        required: true
    },
    showTime: {
        type: Schema.Types.Date,
        trim: true,
        required: true
    },
    hours: {
        type: Schema.Types.Number,
        trim: true,
        required: true
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tblTheatre',
        required : true
    }
});



tblShowsSchema.index({ showsName: 1 });

const tblShows = mongoose.model('tblShows', tblShowsSchema, 'tblShows');

module.exports = tblShows;