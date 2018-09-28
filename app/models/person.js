const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name:{
        type: String
    },
    time:{
        type: Date,
        default: Date.now()
    },
    stream:[{
        name:{
            type: String
        },
        origin:{
            type: String
        },
        destination:{
            type: String
        },
        timestamp:{
            type:Date
        }
    }]
});

const Person = mongoose.model('Person',personSchema);

module.exports = {
    Person
}