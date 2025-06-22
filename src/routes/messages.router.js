import express from 'express'
import channelMiddleware from '../middlewares/channel.middleware'
import workspaceMiddleware from '../middlewares/workspace.middelware'
const messageRouter = express.Router()

messageRouter.post(
    '/:workspace_id/:channel_id', 
    workspaceMiddleware,
    channelMiddleware
)

export default messageRouter