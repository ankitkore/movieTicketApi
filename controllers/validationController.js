const mongo = require('../models/mongo.config');
const helpers = require('../helpers/helpers')
module.exports = {
   addShow : async(req, res, next) => {
        let rawShowTime = req.body.showTime;
        const showTime = new Date(rawShowTime);
        let msg = ""
        if(showTime <= new Date())
            msg = "Show Time should be greater than current time"
        if(!req.body.theatreId.match(/^[0-9a-fA-F]{24}$/)){
           msg = "Invalid theatre id"
        }
        if(msg)
            res.status(200).send({status: "Failed", msg})
        else
            next();
   },
   bookTicket : async(req, res, next) => {
        let msg = ""
        if(!req.body.showId.match(/^[0-9a-fA-F]{24}$/)){
        msg = "Invalid show id"
        }
        if(msg)
            res.status(200).send({status: "Failed", msg})
        else
            next();
    }
}