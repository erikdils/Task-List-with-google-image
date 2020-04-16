const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const cheerio = require('cheerio')
const fetchUrl = require("fetch").fetchUrl;

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl("https://www.google.com.ua/search?q=broccoli", function(error, meta, body){
    // console.log(body.toString());
    const $ = cheerio.load(body.toString())
    $('img').map((i, el) => {
        console.log(i, el.attribs.src)
    }) 
});


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
  res.json(data)
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
