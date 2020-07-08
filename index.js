const express = require('express'),
app = express(),
cors = require("cors"),
persons = require("./Todos"),
todo = require("./Todolist"),
mongoose = require("mongoose"),
ObjectId = mongoose.Types.ObjectId;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: "true"});

mongoose.connection.on("error", (err) => {
  console.log("err", err); 
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.get('/api/course', (req, res) => {
  persons.find({})
  .then(value => {
    res.status(200).json({msg: "persons added", value});
  });
});

app.get('/api/course/value', (req, res) => {
  todo.find({})
  .then( value => {
    res.status(200).json({msg: "persons added", value})
  });
});

app.post("/api/course",(req, res) => {
  const {name, age, gender} = req.body.user;
  new persons({name, age, gender, createdAt: new Date().toString() })
  .save()
  .then( result => {
    persons
    .find({})
    .then(value => {
        res.status(200).json({msg: "persons added", result, value});
    })
  })
  .catch( e => {
    console.log(e);
  });
});

app.post("/api/course/value", (req, res) => {
  new todo({ todolist: req.body.users, createdAt: new Date().toString()})
  .save()
  .then(result => {
    todo
    .find({})
    .then(value => {
      res.status(200).json({msg: "Todos added", result, value});
    })
    .catch(e => {
      console.log(e);
    });
  }).catch(err => {
    console.log(err)
    res.status(501).json({msg: "error"});
  });
});

app.delete('/api/course', (req, res) => {
  const { _id } = req.query;

  if(!_id){
    res.status(404).json({msg: "Error, _id not found"});
    return;
  }

  persons
  .deleteOne({_id: ObjectId(_id)})
  .then(() => {
    persons
    .find({})
    .then(value => {
        res.status(200).json({value})
    });
  });
});

app.delete("/api/course/value", (req, res) => { 
  const { _id } = req.query;
  if(!_id){
    res.status(404).json({msg: "Error, _id not found"});
    return;
  }
  todo
  .deleteOne({_id: ObjectId(_id)})
  .then(() => {
    todo
    .find({})
    .then(value => { res.status(200).json({value})});
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));