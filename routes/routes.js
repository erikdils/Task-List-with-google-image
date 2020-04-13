const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  title: String,
  description: String,
  done: Boolean 
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/test', function (req, res, next) {
  res.json({a: 1})
});

router.post('/task', function (req, res, next) {
  console.log(req.body)
  const task = new Task(req.body);
  task.save().then(() => res.json({ok: true}));
});

router.get('/task', (req, res) => {
  Task.find({}).then((data) => { res.json(data) })
});

router.put('/task/:_id', (req, res) => {
  const _id = req.params._id
  console.log(_id)
  Task.findOneAndUpdate({ _id }, { done: req.body.done })
    .then(() => { res.json({ ok: true }) })
    .catch(() => { res.json({ ok: false }) })
})

router.delete('/task/:_id', (req, res) => {
  const _id = req.params._id
  Task.deleteOne({ _id })
  .then(() => { res.json({ ok: true }) })
  .catch(() => { res.json({ ok: false }) })
})

module.exports = router;
