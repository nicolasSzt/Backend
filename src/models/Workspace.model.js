import { Schema, model } from "mongoose";

const workspacesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
  },

  owner_id: {
    type: Schema.ObjectId,
    ref: "user",
    required: true, 
  },

  created_at: {
    type: Date,
    default: new Date(),
  },
});

const Workspaces = model("workspaces", workspacesSchema);

export default Workspaces;
