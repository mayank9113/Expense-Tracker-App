const mongoose = require('mongoose')

mongoose.connect( 'mongodb+srv://Mongoose213:Mongo911@cluster0.qedeww7.mongodb.net/Expense_Tracker',
    {useNewUrlParser : true , useUnifiedTopology : true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))

connection.on('connected', () => console.log('Mongo DB Connection Successfull'))
