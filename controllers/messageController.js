const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  // console.log("get MSG");
  try {
    const { from, to } = req.body;
   
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ createdAt: 1 });

    const projectedMessages = messages.map((msg) => {
      
      return {
        id:msg._id,
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt:msg.createdAt,
        reaction:msg.message.reaction
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message,reaction:"" },
      users: [from, to],
      sender: from,
    });
    // console.log(data._id);

    if (data) return res.json({ msg: "Message added successfully." ,id:data._id});
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addreaction = async (req, res, next) => {
  const { id, reaction } = req.body;
  const filter = { _id: id.id };
  const update = { message: {text:id.message,reaction:reaction} };
  const data = await Messages.findOneAndUpdate(filter,update, {new:true})
  // console.log(data);
};

