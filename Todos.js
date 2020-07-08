const Mongoose = require('mongoose');
const todosSchema = new Mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    createdAt: {
        type: Date
    }
});

module.exports = Mongoose.model('persons', todosSchema);