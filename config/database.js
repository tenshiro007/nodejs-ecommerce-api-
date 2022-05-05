const mongoose=require('mongoose')

const mongoUrl=process.env.DATABASE

exports.connect=()=>{
    mongoose.connect(mongoUrl).then(
        console.log('Database connect ...')
    ).catch(err=>{
        console.log('Error connecting to database');
        console.error(err);
    })
}