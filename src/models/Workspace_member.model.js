import { Schema,model } from "mongoose";
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/members_workspace_roles.js";

const workspaceMembersSchema = new Schema({
  workspace_id: {
    type: Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },

  userId: {
    type: Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },

  role: {
    type: String,
    require: true,
    enum: AVAILABLE_ROLES_WORKSPACE_MEMBERS,
  },
});

const WorkspaceMember = model(
  "members_workspaces",
  workspaceMembersSchema
);

export default WorkspaceMember;
