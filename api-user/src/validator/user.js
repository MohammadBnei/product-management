const { Validator } = require('jsonschema')

const validator = new Validator()
const userSchema = {
    'type': 'object',
    'properties': {
        'username': {
            'type': 'string',
            'minLength': 1,
        },
        'password': {
            'type': 'string',
            'minLength': 1,
        }
    },
    'required': ['username', 'password']
}

module.exports = {
    verifyUser: (req, res, next) => {
        const user = req.body
        const result = validator.validate(user, userSchema)

        if (result.errors?.length) {
            console.log({validation: result.errors, user});
            return res.status(400).send({
                error: result.errors[0].message
            })
        }

        next()
    }

}