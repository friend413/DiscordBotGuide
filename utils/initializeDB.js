const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

exports.init = async () => {
    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');

        userModel.findOne( {role: "admin"} )
            .then(async (rlt) => {
                if( rlt != null )
                    console.log(`${rlt} admin exists already.`)
                else{
                    const admin = new userModel({
                        firstName: 'Olivia',
                        lastName: 'Fhyre',
                        email: 'abc@gmail.com',
                        role: 'admin',
                        password: await bcrypt.hash('123', 10)
                    });
                    console.log(bcrypt.hash('123', 10))
                    userModel.create(admin)
                        .then(rlt => {
                            console.log(`${admin} is created as a admin.`)
                        })
                        .catch(err => {
                            console.log(`Can't create admin.`)
                            process.exit(0);
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}