import express from "express";
import Chat from "../models/chatModel.js";
const chatRoute = express.Router()
chatRoute.get("/:roomId", (req, res) => {
  const chatData = Chat.findOne({roomId:req.params.roomId})
  if (chatData) {
    res.send(chatData).status(200);
  }
  else {
     res.send([]).status(200);
  }
});
chatRoute.post("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});
export default chatRoute