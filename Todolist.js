const Mongoose = require('mongoose');
const todosSchema = new Mongoose.Schema({
    todolist: {
      type: String,
      required: true
    },
    createdAt: {
        type:Date
    }
});

module.exports = Mongoose.model('todo', todosSchema);