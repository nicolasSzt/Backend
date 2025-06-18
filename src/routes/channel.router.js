import express from 'express'
import channel_controller from '../controllers/channel.controller.js'
import authorizationMiddleware from '../middlewares/auth.middlewares.js'
import workspaceMiddleware from '../middlewares/workspace.middelware.js'
const channelRouter = express.Router()

channelRouter.post('/:workspace_id', authorizationMiddleware, workspaceMiddleware, channel_controller.create)
channelRouter.get('/:workspace_id', authorizationMiddleware, workspaceMiddleware, channel_controller.getAllByWorkspaceId)

export default channelRouter