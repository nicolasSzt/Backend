import express from "express";
import authorizationMiddleware from "../middlewares/auth.middlewares.js";
import members_workspace_controller from "../controllers/memebersWorkspace.controller.js";
import workspaceMiddleware from "../middlewares/workspace.middelware.js";
const memberWorkspaceRouter = express.Router();

memberWorkspaceRouter.post(
  "/:workspace_id",
  authorizationMiddleware,
    members_workspace_controller.add
);

memberWorkspaceRouter.get(
  "/:workspace_id",
  authorizationMiddleware,
  workspaceMiddleware,
  members_workspace_controller.getAllByWorkspace
);

export default memberWorkspaceRouter;
