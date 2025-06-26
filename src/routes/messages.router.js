import express from 'express'
import channel_messages_controller from '../controllers/messages.controller.js'
import channelMiddleware from '../middlewares/channel.middleware.js'
import workspaceMiddleware from '../middlewares/workspace.middelware.js'
import authorizationMiddleware from '../middlewares/auth.middlewares.js'

const messageRouter = express.Router()

messageRouter.use(authorizationMiddleware)


messageRouter.post(
    '/:workspace_id/:channel_id', 
    workspaceMiddleware,
    channelMiddleware,
    channel_messages_controller.create
)

messageRouter.get(
    '/:workspace_id/:channel_id', 
    workspaceMiddleware,
    channelMiddleware,
    channel_messages_controller.getAllByChannel
)

export default messageRouter