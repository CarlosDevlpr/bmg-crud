const yup = require('yup')

const createUserSchema = yup.object({
    name: yup.string().required().matches(/^[a-z]+$/, 'Only alphabetic characters allowed'),  
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

const updateUserSchema = yup.object({
    name: yup.string().matches(/^[a-z]+$/, 'Only alphabetic characters allowed'),  
    email: yup.string().email(),
    password: yup.string().min(6)
})

const idOnParams = yup.object({
    id: yup.number()
})

const RCreateUserSchema = yup.object({
    body: createUserSchema
})

const RUpdateUserSchema = yup.object({
    body: updateUserSchema,
    params: idOnParams
})

const RDeleteUserSchema = yup.object({
    params: idOnParams
})

module.exports = { RCreateUserSchema, RUpdateUserSchema, RDeleteUserSchema }