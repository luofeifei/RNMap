var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://luofeifei:luofeifei@ds029705.mlab.com:29705/mytaxiapp", ["bookings"]);
//var db = mongojs("mongodb://eman:eman@ds163181.mlab.com:63181/taxiapp", ["bookings"]);

router.get("/bookings", function(req, res, next){
	db.bookings.find(function(err, bookings){
      
		if(err){
			res.send(err);

		}
		res.json(bookings);
	})
}); 

router.post("/bookings", function(req, res, next){
	var booking = req.body.data;
	var nearByDriver = req.body.nearByDriver;
	var io = req.body.io;
 
	if(!booking.userName){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	} else {
		db.bookings.save(booking, function(err, savedBooking){
			if(err){
				res.send(err);
			}
			res.json(savedBooking);
			if(nearByDriver.socketId){
				io.emit(nearByDriver.socketId + 'driverRequest', savedBooking);
			}else{
				console.log('driver unconnected');
			}
		});
	}
})

module.exports = router;
