import { Schema, model } from "mongoose";

const ChannelMessageSchema = new Schema({
  member_channel_id: {
    type: Schema.ObjectId,
    required: true,
    ref: "MemberChannel",
  },

  channel_id: {
    type: Schema.ObjectId,
    required: true,
    ref: "Channel",
  },
  user_id: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: new Date(),
  },
});

const ChannelMessage = model("channels_messages", ChannelMessageSchema);

export default ChannelMessage;
