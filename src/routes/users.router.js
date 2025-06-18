import express from 'express'
import userController from "../controllers/user.controller.js"
const usersRouter = express.Router()

usersRouter.get('/', userController.getAll)
usersRouter.post('/register', userController.register)
usersRouter.post('/login', userController.login)

usersRouter.get('/verify', userController.verify)

usersRouter.get('/resend-verification-mail', userController.resendVerificationEmail)

usersRouter.put('/api/users/hola', (request, response) => {
    response.send("FUNCIONAAAA")
})

export default usersRouter