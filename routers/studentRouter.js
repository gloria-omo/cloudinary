const express = require('express');
const { signUp, getOne, getAll, userUpdate } = require('../controllers/studentController');
const upload = require('../utils/multer');
const router = express.Router();


router.post('/sign-up', upload.single('profileImage'), signUp);

router.get('/one/:id', getOne);

router.get('/all/', getAll);

router.patch('/update/:id', upload.single('profileImage'),userUpdate);


module.exports = router