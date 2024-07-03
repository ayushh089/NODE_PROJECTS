const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");
const { options } = require("yargs");
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const _id = await req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  //!sare aa jaynege
  const match = {};
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  req.query.completed;
  try {
    // const task = await Task.find({ owner: req.user._id });
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
        // sort: {
        //   // createdAt:-1 //asc :1 desc -1
        //   completed: -1, // 1 false phle  -1 false baad me
        // },
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  //! find krega by id
  try {
    const _id = await req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    } else {
      res.send(task);
    }
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/tasks", auth, async (req, res) => {
  //!mongo me ye task add  ho jayega jo postman me denge
  const task = new Task({
    ...req.body, //es6 copy all prop of body to obj
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400);
    res.send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = await req.params.id;
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
