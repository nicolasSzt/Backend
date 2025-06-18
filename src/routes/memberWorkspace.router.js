import express from 'express'
import authorizationMiddleware from '../middlewares/auth.middlewares.js'
import members_workspace_controller from '../controllers/memebersWorkspace.controller.js'
const memberWorkspaceRouter = express.Router()

memberWorkspaceRouter.post(
    '/:workspace_id', 
    authorizationMiddleware, 
    members_workspace_controller.add  
)

export default memberWorkspaceRouter