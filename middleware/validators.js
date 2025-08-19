//WE ARE VALIDATING REQ IF THEY HAVE CORRECT SCHEMA OR NOT 

// FOR EXAMPLE FOR CREATE BLOG FUNCTION I WANT TO MAKE SURE THE INCOMING REQUEST HAS CORRECT SCHEMA 
// TO WHOM WILL I MATCH THE INCOMING REQ SCHEMA WITH ?
// CHECK IN VALIDATIONS FOLDER THERE IS createBlogSchema , that is sepcifically designed for the createBlog request

const validate = (schema) => (req, res, next) => {
    const keys = Object.keys(schema);
    console.log('Keys From Validation Middleware:', keys);
    const object = keys.reduce((obj, key) => {
        if (Object.prototype.hasOwnProperty.call(req, key)) {
            obj[key] = req[key];
        }
        return obj;
    }, {});
    console.log('Object From Validation Middleware:', object);
    const { value, error } = Joi.compile(schema).validate(object);
    if (error) {
        console.log('Error Object From Joi in Validation Middleware:', error);
        const errors = error.details.map((detail) => {
            return {
                key: detail.context.key,
                message: detail.message,
                path: detail.path,
            };
        });
        return res.status(400).json({ error: true, errors });
    }

    return next();
}
module.exports = validate;