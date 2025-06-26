import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/members_workspace_roles.js";
import members_workspace_repository from "../repositories/membersWorkspace.repository.js";
import workspaces_repository from "../repositories/workspace_repository.js";
import ApiResponse from "../utils/apiResponse.js";

class WorkspaceController {
  async create(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const { title, description } = request.body;
      const { id } = request.user;

      const exists =
        await workspaces_repository.getByTitleAndOwner(
          title,
          id
        );

      if (exists) {
        return apiResponse.error("Ya existe un workspace con ese título", 400);
      }

      const workspace = await workspaces_repository.create({
        title,
        description,
        owner_id: id,
      });

      await members_workspace_repository.create({
        workspace_id: workspace._id,
        user_id: id,
        role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN,
      });

      return apiResponse.created(
        "Workspace creado exitosamente",
        { workspace },
        201
      );
    } catch (error) {
      console.error("Hubo un error", error);
      return apiResponse.error();
    }
  }

  async getAll(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const workspaces = await workspaces_repository.getAll();

      return apiResponse.success(
        "Todos los workspaces del sistema",
        { workspaces },
        200
      );
    } catch (error) {
      return apiResponse.error();
    }
  }
  async delete(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const workspace_id = request.params.workspace_id;
      const user_id = request.user.id;

      const deletedWorkspace =
        await workspaces_repository.deleteWorkspaceFromOwner(
          user_id,
          workspace_id
        );

      if (!deletedWorkspace) {
        return apiResponse.error(
          "Workspace no encontrado o no autorizado",
          404
        );
      }

      await members_workspace_repository.deleteAllByWorkspaceId(workspace_id);

      return apiResponse.success("Workspace eliminado correctamente", {});
    } catch (error) {
      console.error("Hubo un error", error);
      return apiResponse.error();
    }
  }

  async getAllByMember(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const { id } = request.user;

      const workspacesMember = await members_workspace_repository.getAllByUserId(id);

      return apiResponse.created("Lista de workspaces", { workspacesMember });
    } catch (error) {
      console.error("Hubo un error", error);
      return apiResponse.error();
    }
  }
}

const workspace_controller = new WorkspaceController();
export default workspace_controller;
