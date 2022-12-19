import mongoose from "mongoose";
const chatModel = new mongoose.Schema({
  roomId: { type: String },
  messages: [
    {
      name: { type: String },
      email: { type: String },
      message: { type: String},
    },
  ],
});
const Chat = mongoose.model("Chat", chatModel)
export default Chat