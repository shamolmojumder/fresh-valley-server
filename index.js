
const express = require('express')
const app = express()
const port =process.env.PORT || 5055

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`hello from http://localhost:${port}`)
})
