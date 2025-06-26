import WorkspaceMember from "../models/Workspace_member.model.js";

class MembersWorkspaceRepository {
  async create({ workspace_id, user_id, role }) {
    const workspace_member = new WorkspaceMember({
      workspace_id,
      user_id,
      role,
    });
    await workspace_member.save();
  }
  async getAllByWorkspaceId(workspace_id) {
    return await WorkspaceMember.find({ workspace_id: workspace_id });
  }

  async getAllByUserId(user_id) {
    const workspaces_list = await WorkspaceMember.find({
      user_id: user_id,
    }).populate("workspace_id", "title");

    const workspacesIsMember = workspaces_list.map((workspaceMember) => ({
      member_id: workspaceMember._id,
      workspace: workspaceMember.workspace_id,
      user_id: workspaceMember.user_id,
      role: workspaceMember.role,
    }));

    return workspacesIsMember;
  }

  async getMemberByWorkspaceIdAndUserId(workspace_id, user_id) {
    return await WorkspaceMember.findOne({
      workspace_id: workspace_id,
      user_id: user_id,
    });
  }
  async deleteAllByWorkspaceId(workspace_id) {
    return await WorkspaceMember.deleteMany({ workspace_id });
  }
}

const members_workspace_repository = new MembersWorkspaceRepository();
export default members_workspace_repository;
