const { User } = require('./models/index') 
const { hashPassword } = require('./services')

const getUsersController = async (req, res) => {
    const allUsers = await User.findAll()
    return res.send(allUsers)
}

const createUserController = async (req, res) => {
    const hasUser = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (hasUser) return res.status(409).send({error: "Email Already in Use"})

    const createdUser = await User.create({...req.body, email: req.body.email.toLowerCase(),password: hashPassword(req.body.password)})
    return res.send(createdUser)
}

const updateUserController = async (req, res) => {
    const hasUserWithEmail = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    const hasUserWithId = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if (hasUserWithId && !hasUserWithEmail) {
        const updatedUser = await User.update( req.body.password ?
            {...req.body, email: req.body.email.toLowerCase(),password: hashPassword(req.body.password)} :
            {...req.body, email: req.body.email.toLowerCase()}  ,
            {
                where: {
                    id: req.params.id
                }
            })

        return res.send(updatedUser)
    }

    return res.status(400).send({ error: "An Error Occured" })
}

const deleteUserController = async (req, res) => {
    const hasUser = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!hasUser) res.status(404).send({ notFound: "Id Not Fount" })

    const deletedUser = await User.destroy({
        where: {
            id: req.params.id
        }
    })

    return res.send(deletedUser)
}


module.exports = { getUsersController, createUserController, updateUserController, deleteUserController }