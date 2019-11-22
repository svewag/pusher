const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const api = require('./api')

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req: any, res: any) => res.render('pages/index'))
  .use('/api/*', api)
  .listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`))
