const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

mongoose.connect(DB).then( () => {
    console.log("Connection Secured")
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`connected at server ${PORT}`);
});
