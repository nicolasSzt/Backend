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
    return await WorkspaceMember.find({ user_id: user_id });
  }
}

const members_workspace_repository = new MembersWorkspaceRepository;
export default members_workspace_repository;
