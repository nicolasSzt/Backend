import { Schema, model } from "mongoose";

const workspaceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Workspace = model("Workspace", workspaceSchema);

export default Workspace;
