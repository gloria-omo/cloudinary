const express = require('express');
const studentRouter = require('./routers/studentRouter');
require('./config/config')
const PORT = process.env.PORT
const app = express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));


app.use('/api/v1/user', studentRouter);


app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`);
})
