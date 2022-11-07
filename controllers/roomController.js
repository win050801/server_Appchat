const Room = require("../models/roomModel")

module.exports.addRoom = async (req, res, next) => {

    try {
        const {members,roomName,manager} = req.body
        const data = await Room.create({
            roomName: roomName,
            members: members,
            manager: manager,
          });
          if (data) return res.json({ msg: "Room added successfully." ,id:data._id});
          else return res.json({ msg: "Failed to add message to the database" });
    } catch (error) {
        next(error);
    }
}

module.exports.getRoom = async (req, res, next) => {
    // console.log("get MSG");
    try {
      const { id } = req.body;
     
      const rooms = await Room.find({
        members: {
          $all: [id],
        },
      }).sort({ createdAt: 1 });
  
      const projectedMessages = rooms.map((room) => {
        return {
          id:room._id,
          manager:room.manager,
          roomName:room.roomName,
          members: room.members,
          createdAt:room.createdAt,
         
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.addThanhVien = async (req, res, next) => {
    try {
      const id = req.body.id;
      const mems = req.body.mems;
      const member = await Room.findByIdAndUpdate(
        id,
        {
          members: mems,
        },
        { new: true }
      );
      console.log(id);
      return res.json({
        mess: "Them Thanh Cong",
      });
    } catch (ex) {
      next(ex);
    }
  };
  