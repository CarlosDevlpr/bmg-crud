const Router = require('express')
const { 
    getUsersController,
    createUserController,
    deleteUserController,
    updateUserController
} = require('./userControllers.js')

const { 
    RCreateUserSchema,
    RUpdateUserSchema,
    RDeleteUserSchema
} = require('./userSchemas.js')

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            params: req.params,
            query: req.query
        })

        return next()
    } catch (err) {
        return res.status(400).send({ error: err.name, message: err.message })
    }
}

const routes = Router()

routes.get('/user', getUsersController)
routes.post('/user', validate(RCreateUserSchema), createUserController)
routes.put('/user/:id', validate(RUpdateUserSchema), updateUserController)
routes.delete('/user/:id', validate(RDeleteUserSchema), deleteUserController)

module.exports = routes