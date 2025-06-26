import { Schema, model } from "mongoose";

const channelSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  
  description: {
    type: String,
    trim: true,
  },
  
  created_at: {
    type: Date,
    default: new Date(),
  },
  
  isPrivate: {
    type: Boolean,
    default: false,
    required: true,
  },

  workspace_id: {
    type: Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },
});

const Channel = model("Channel", channelSchema);

export default Channel;
