const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);

mongoose.connect('mongodb://localhost:27017/blog_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log('Cpostonnected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));
