const mongoose = require('mongoose');


  const connect = async () => {
    try {
      await mongoose.connect("mongodb+srv://movieTicketDB:fx6LZvaT4VidP5CK@cluster0.9gozou9.mongodb.net/?retryWrites=true&w=majority", {
        dbName: "movieTicketDB",
        useUnifiedTopology: true,
        useNewUrlParser: true
      });

      console.log('Mongo Connected');
    } catch (error) {
      console.log('Failed to connect Mongo');
      console.log(error);
    }
  };
  connect();

  module.exports = {
    tblTheatre: require('./tblTheatre'),
    tblShows: require('./tblShows')
  };
