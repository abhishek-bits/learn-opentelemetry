const PORT = process.env.PORT || "8080"
const express = require('express')
const { requestCounter } = require('./monitoring')
const app = express()

// Middleware to count incoming requests
app.use((req, res, next) => {
    // Increment the counter with labels for router and method
    requestCounter.add(1, {
        route: req.path,
        method: req.method
    })
    next()
})

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.get('/date', (req,res) => {
    res.json({ today: new Date() })
})

app.listen(parseInt(PORT, 10), () => {
    console.log(`Listening for requests on http://localhost:${PORT}`)
})
