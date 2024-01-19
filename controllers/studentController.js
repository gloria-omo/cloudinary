const userModel = require('../models/studentModel');
// const cloudinary = require("../utils/clouldinary.js")
import {v2 as cloudinary} from 'cloudinary';
require("dotenv").config()
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});


const fs = require('fs')

exports.signUp = async (req, res) => {
    try {
        const { fullName, stack } = req.body;
        const file = req.file.path

        const result = await cloudinary.uploader.upload(file)

        const profile = await userModel.create({
            fullName,
            stack,
            profileImage: result.secure_url
        })

        if (!profile) {
            return res.status(400).json({
                message: 'Unable to sign up'
            })
        } else {
            res.status(201).json({
                message: 'Successfully signed up',
                data: profile
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const profile = await userModel.findById(id);

        if (!profile) {
            return res.status(404).json({ 
                message: 'User not found'
            })
        }

        res.status(200).json({ 
            status:'Success',
            message: 'User found',
            data: profile
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getAll = async (req, res) => {
    try {
        const profile = await userModel.find();

        if (profile.length === 0) {
            return res.status(200).json({ 
                message: 'There are no user in this database'
            })
        }

        res.status(200).json({ 
            status:'Success',
            message: `${profile.length} User(s) found in this database`,
            data: profile
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.userUpdate = async (req, res ) => {
    try {
        const id = req.params.id;
        const { victory, stack } = req.body
        const profile = await userModel.findById(id);

        if (!profile) {
            return res.status(404).json({ 
                status: 'Failed',
                message: 'User not found'
            })
        }

        const data = {
            fullName: victory || profile.fullName,
            stack: stack || profile.stack,
            profileImage: profile.profileImage
        } 
        
        
        // Check if the user is passing a new image
        if (req.file["profileImage"]) {
            // create a variable to hold the path of the image
            const oldImagePath = `./uploads/${profile.profileImage}`
            // check if there is an image in the path
            if (fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath)
            }

            data.profileImage = req.file.filename

        }

        const newProfile = await userModel.findByIdAndUpdate(id, data, {new: true});

        if (newProfile) {
            return res.status(200).json({ 
                status:'Success',
                message: 'Profile updated successfully',
                data: newProfile
            })
        } else {
         res.status(400).json({ 
                status:'Failed',
                message: 'Cannot update Profile'
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
