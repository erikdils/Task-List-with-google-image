const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const cheerio = require('cheerio')
const fetchUrl = require("fetch").fetchUrl;
const puppeteer = require('puppeteer');


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
  let new1 = []
    
  data.forEach((task, i) => {

    (async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(`https://www.google.com.ua/search?q=${task.title}`)
      // await page.screenshot({ path: 'melone.png' })
      const html = await page.content();
      const $ = cheerio.load(html)
      const imgs = []
      $('img').map((ii, el) => {
        imgs.push(el.attribs.src)
        console.log(el.attribs.src)
      }) 
      readyTask++
      new1.push([task, imgs])
      if (taskAmount == readyTask) { res.json(new1) }
      await browser.close()
    })()
    
    // fetchUrl(`https://www.google.com.ua/search?q=${task.title}`, function(error, meta, body){
    //   const $ = cheerio.load(body.toString())
    //   const imgs = []
    //   $('img').map((ii, el) => {
    //     imgs.push(el.attribs.src)
    //     console.log(el.attribs.src)
    //   }) 
      
    //   readyTask++
    //   // console.log(taskAmount, readyTask, data[i])
    //   task.test = true
    //   new1.push([task, imgs])
    //   if (taskAmount == readyTask) { res.json(new1) }
    // });
  
  })

  console.log(new1,'Test')
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
