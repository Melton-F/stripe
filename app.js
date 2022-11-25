const express = require('express')
const stripe = require('stripe')("sk_test_51M6q8ISB4tKazm0ByFZZQ2NUJtzDHmeYXlXGLDM7oYPNSMmasQClbuBXAsjG6q6nn2xefxrzLoTkks2Uxwu7PFCx00u8CAdo9S")
const app = express()
const stripeRouter = require('./router/stripeRouter')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/stripe', stripeRouter)

app.use((req, res, next) => {
    res.status(404).json({ error: "requested page not found" })
});


module.exports = app



// const chalkRainbow = require('chalk-rainbow')
// const chalk = require('chalk')

// console.log(chalkRainbow("colourfulllllll"))
// console.log(chalk.greenBright(`chalk`))