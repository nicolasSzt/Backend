import members_workspace_repository from "../repositories/membersWorkspace.repository.js";
import workspaces_repository from "../repositories/workspace_repository.js";

const workspaceMiddleware = async (req, res, next) => {
    const workspaceId = req.params.workspace_id;
    const userId = req.user.id;

    try {
        const workspace = await workspaces_repository.getById(workspaceId);
        if (!workspace) {
            throw { status: 404, message: 'Workspace not found' };
        }

        const member = await members_workspace_repository.getMemberByWorkspaceIdAndUserId(workspaceId, userId);
        if (!member) {
            throw { status: 403, message: 'You are not a member of this workspace' };
        }

        req.workspace = workspace;
        next();
    } catch (error) {
        res.status(error.status).json({ message: error.message, status: error.status, ok: false });
    }
};

export default workspaceMiddleware