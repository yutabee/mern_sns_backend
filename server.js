const express = require('express');
const app = express();
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const uploadRoute = require('./routes/upload');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
 
const PORT = 3001;  //フロントとバックエンドでポートが競合するので分ける

//データベース接続
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB接続中...')
    }).catch((err) => {
        console.log(err);
    });

// ミドルウェア
app.use('/images', express.static(path.join(__dirname, "public/images")));  
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/upload', uploadRoute);

// app.get('/', (req, res) => {
//     res.send('Hello express');
// });

// app.get('/users', (req, res) => {
//     res.send('users express');
// })

app.listen(PORT, () => console.log('サーバーが起動しました'));
