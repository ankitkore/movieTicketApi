const mongo = require('../models/mongo.config');
const helpers = require('../helpers/helpers')
module.exports = {
    addTheatre: async (req, res) => {
        try{
            let theatreName = req.body.theatreName, state = req.body.state, totalScreens = req.body.totalScreens
            if(theatreName && state && totalScreens){
                const records = await mongo.tblTheatre.find({ theatreName});
                if(records.length == 0){
                    try{
                        const resp = await mongo.tblTheatre.create({theatreName, state, totalScreens});
                        res.status(200).send({status: "Success", msg: "Registered Successfully" , theatreId : resp._id})
                    }catch(e){
                        res.status(500).send({status: "Failed", msg: "Something went wrong"})
                    }
                }else{
                    res.status(200).send({status: "Failed", msg: "Theatre already registered"})
                }
            }else{
                res.status(200).send({status: "Failed", msg: "All fields required"})
            }
        }catch{
            res.status(500).send({status: "Failed", msg: "Something went wrong"})
        }
    },
    addShow: async (req, res) => {
        try{
            let screenId = req.body.screenId, showName = req.body.showName,tickets = req.body.tickets, rawShowTime = req.body.showTime,hours = req.body.hours, theatreId = req.body.theatreId;
            const showTime = new Date(rawShowTime);
            if(theatreId && screenId && showName && tickets && showTime && hours){
                const rec = await mongo.tblTheatre.find({ _id: theatreId });
                if(rec.length > 0){
                    const records = await mongo.tblShows.find({ theatreId, screenId , showTime : {$gte: showTime , $lte: helpers.addHours(hours, new Date(rawShowTime) ) }}).populate('theatreId');
                    if(records.length == 0){
                        try{      
                            const resp = await mongo.tblShows.create({theatreId, 
                                screenId,
                                showName,
                                tickets,
                                showTime,
                                hours
                            });
                            
                            res.status(200).send({status: "Success", msg: "Show added Successfully", showId : resp._id})
                        }catch(err){
                            console.log(err);
                            res.status(500).send({status: "Failed", msg: "Something went wrong"})
                        }
                    }else{
                        res.status(200).send({status: "Failed", msg: "Shows Overlap"})
                    }
                }else{
                    res.status(200).send({status: "Failed", msg: "Invalid Theatre Id"})
                }
            }else{
                res.status(200).send({status: "Failed", msg: "All fields required"})
            }
        }catch(e){
            console.log(e);
            res.status(500).send({status: "Failed", msg: "Something went wrong"})
        }
    },
    bookTicket: async (req, res) => {
        try{
            let showId = req.body.showId, tickets = req.body.ticketsToBook;
            if( showId && tickets){
                const records = await mongo.tblShows.findOne({ _id: showId })
                if(records){
                    try{      
                        let updateTickets = records.tickets, ticketsBooked = 0;
                        if(records.tickets <= tickets){
                            updateTickets = 0;
                            ticketsBooked = records.tickets ;
                        }else{
                            updateTickets = records.tickets - parseInt(tickets);
                            ticketsBooked = tickets ;
                        }
                        await mongo.tblShows.updateOne({ _id : showId }, { $set:{ tickets: updateTickets }});
                        res.status(200).send({status: "Success", msg: `${ticketsBooked} Tickets booked Successfully`})
                    }catch(err){
                        console.log(err);
                        res.status(500).send({status: "Failed", msg: "Something went wrong"})
                    }
                }else{
                    res.status(200).send({status: "Failed", msg: "Invalid ShowId"})
                }
            }else{
                res.status(200).send({status: "Failed", msg: "All fields required"})
            }
        }catch(e){
            console.log(e);
            res.status(500).send({status: "Failed", msg: "Something went wrong"})
        }
    },
    listOfShows: async (req, res) => {
        try{
            let state = req.query.state;
            const showTime = new Date();
            const pop = {
                path: 'theatreId'
            }
            if(state && await mongo.tblTheatre.findOne({ state }))
                pop.match = {state}
            const records = await mongo.tblShows.find({ showTime : {$gte: showTime }}).populate(pop);
            const finalData = records.filter(record => record.theatreId)
            if(finalData.length > 0){
                try{      
                    res.status(200).send({status: "Success", data: finalData})
                }catch(err){
                    // console.log(err);
                    res.status(500).send({status: "Failed", msg: "Something went wrong"})
                }
            }else{
                res.status(200).send({status: "Failed", msg: "No show found"})
            }
        }catch(e){
            // console.log(e);
            res.status(500).send({status: "Failed", msg: "Something went wrong"})
        }
    }
}