const { Blog } = require('../model');
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json({
            status: 'success',
            results: blogs.length,
            data: {
                blogs
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getBlog = async (req, res) => {
    try {
        console.log(req.params);
        if (!req.params.id) {
            return res.status(400).json({
                status: 'fail',
                message: 'Blog ID is required'
            })
        }
        const blog = await Blog.findOne({ where: { id: req.params.id } });
        if (!blog) {
            return res.status(404).json({
                status: 'fail',
                message: 'Blog not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                blog
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}
exports.createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                status: 'fail',
                message: 'Title and description are required'
            })
        }
        const blog = await Blog.create({
            title, description
        })
        res.status(201).json({
            status: 'success',
            data: {
                blog
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}
exports.deleteBlog = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                status: 'fail',
                message: 'Blog ID is required'
            })
        }
        const blog = await Blog.destroy({ where: { id: req.params.id } });
        if (!blog) {
            return res.status(404).json({
                status: 'fail',
                message: 'Blog not found'
            })
        }
        res.status(204).json({
            status: 'success',
            data: null
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}