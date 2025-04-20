const express = require('express');
const db = require('./model/index.js');
const config = require('./config/config.js');
const blogRouter = require('./routes/blog.route');





const app = express();
app.use(express.json());




app.use('/api/v1/blogs', blogRouter);

(async () => {
    try {
        await db.sequelize.sync();
        console.log('Database connection established successfully.');
        app.listen(config.port, (err) => {
            console.log('Server is running on port', config.port);
        });
    }
    catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();






