const Blog = require('../model/blog.model.js');
const catchAsync = require('../utils/catchAsync.js');


exports.getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({
        status: 'success',
        results: blogs.length,
        data: {
            blogs
        }
    });
})

exports.createBlog = catchAsync(async (req, res) => {
    const { title, description, author } = req.body;
    const blog = await Blog.create({
        title,
        description,
        author
    });
    res.status(201).json({
        status: 'success',
        data: {
            blog
        }
    });
});

exports.getBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({
            status: 'fail',
            message: 'Blog not found'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
});

exports.deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

// const { Blog } = require('../model');
// const catchAsync = require('../utils/catchAsync.js');
// exports.getAllBlogs = catchAsync(async (req, res) => {
//     const blogs = await Blog.findAll();
//     res.status(200).json({
//         status: 'success',
//         results: blogs.length,
//         data: {
//             blogs
//         }
//     });

// });

// exports.getBlog = catchAsync(async (req, res) => {

//     if (!req.params.id) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Blog ID is required'
//         })
//     }
//     const blog = await Blog.findOne({ where: { id: req.params.id } });
//     if (!blog) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Blog not found'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             blog
//         }
//     })

// });
// exports.createBlog = catchAsync(async (req, res) => {

//     const { title, description } = req.body;
//     // if (!title || !description) {
//     //     return res.status(400).json({
//     //         status: 'fail',
//     //         message: 'Title and description are required'
//     //     })
//     // }
//     const blog = await Blog.create({
//         title, description
//     })
//     res.status(201).json({
//         status: 'success',
//         data: {
//             blog
//         }
//     })


// })
// exports.deleteBlog = catchAsync(async (req, res) => {
//     if (!req.params.id) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Blog ID is required'
//         })
//     }
//     const blog = await Blog.destroy({ where: { id: req.params.id } });
//     if (!blog) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Blog not found'
//         })
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })

// });