import { Schema, model } from "mongoose";
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/members_workspace_roles.js";

const workspaceMembersSchema = new Schema({
  workspace_id: {
    type: Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: AVAILABLE_ROLES_WORKSPACE_MEMBERS,
  },
});

const WorkspaceMember = model("members_workspaces", workspaceMembersSchema);

export default WorkspaceMember;
