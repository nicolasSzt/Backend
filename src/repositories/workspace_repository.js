import Workspaces from "../models/Workspace.model.js";

class WorkspacesRepository {
  async create({ name, owner_id, description, created_at }) {
    const workspace = new Workspaces({
      name,
      owner_id,
      description,
      created_at,
    });
    await workspace.save();
    console.log("Workspace creado exitosamente!");

    return workspace;
  }
  
  async getById(workspace_id) {
    return await Workspaces.findById(workspace_id);
  }
}

const workspaces_repository = new WorkspacesRepository();

export default workspaces_repository;
