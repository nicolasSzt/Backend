import express from 'express'
import authorizationMiddleware from '../middlewares/auth.middlewares.js'
import workpasceController from '../controllers/workspace.controller.js'

const workspace_router = express.Router()

workspace_router.post(
    '/',
    authorizationMiddleware,
    workpasceController.create
)

workspace_router.get(
    '/',
    authorizationMiddleware,
    workpasceController.getAllByMember
)

workspace_router.delete(
    '/:workspace_id/:user_id',
    authorizationMiddleware,
    workpasceController.delete
)

export default workspace_router