const Joi = require('joi');
const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),

});

module.exports = {
    createBlogSchema,
}