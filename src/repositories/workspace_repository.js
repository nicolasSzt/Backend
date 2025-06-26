import Workspace from "../models/Workspace.model.js";

class WorkspacesRepository {
  async create({ title, description, owner_id }) {
    const workspace = new Workspace({
      title,
      description,
      owner_id,
    });
    await workspace.save();
    return workspace;
  }

  async getById(workspace_id) {
    return await Workspace.findById(workspace_id);
  }
  async getByTitleAndOwner(title, owner_id) {
    return await Workspace.findOne({ title, owner_id });
  }

  async getAllByOwner(owner_id) {
    return await Workspace.find({ owner_id });
  }

  async deleteWorkspaceFromOwner(owner_id, workspace_id) {
    return await Workspace.findOneAndDelete({
      _id: workspace_id,
      owner_id,
    });
  }
}

const workspaces_repository = new WorkspacesRepository();
export default workspaces_repository;
