const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const cheerio = require('cheerio')
const fetchUrl = require("fetch").fetchUrl;



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

router.get('/task', async (req, res) => {
  const data = await Task.find({})
  const taskAmount = data.length
  let readyTask = 0
  data.forEach((task, i) => {
    fetchUrl(`https://www.google.com.ua/search?q=${task.title}`, function(error, meta, body){
      // console.log(body.toString());
      const $ = cheerio.load(body.toString())
      data[i].imgs = []
      $('img').map((ii, el) => {
        data[i].imgs.push(el.attribs.src)
      }) 
      readyTask++
      console.log(taskAmount, readyTask, data[i])

      if (taskAmount == readyTask) { res.json(data) }
    });
  })
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
