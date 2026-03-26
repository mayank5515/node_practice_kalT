const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required!"],
    },
    description: {
      type: String,
      required: [true, "Blog description is required!"],
    },
  },
  {
    timestamps: true,
  },
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
// module.exports = (sequelize, DataTypes) => { //sequelize is connection instance to the database , and DataTypes is coming from Sequelize library
//     return sequelize.define('Blog',
//         {
//             id: {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV4,
//                 primaryKey: true,
//                 // autoIncrement: true,
//                 allowNull: false
//             },
//             title: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//             description: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//             }
//         });
// }
