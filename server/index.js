const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const corsMiddleware = require('./middleware/cors.middleware');
const filePathMiddleware = require('./middleware/filepath.middleware');
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const db = config.get('dbUrl')
const path = require('path')


app.use(fileUpload({}))
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.json());
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);


const start = async () => {
    try {
        await mongoose.connect(db)

        app.listen(PORT, () => {
            console.log(`server started to ${PORT}`)
        })
    }catch (e){

    }
}
start()