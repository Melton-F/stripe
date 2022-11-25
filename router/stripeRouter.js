const express = require('express')
const router = express.Router()
const stripeController = require('../controller/stripeController')

router.get('/', (req, res)=> res.send("Welcome to Stripe"))
router.post('/createCustomer', stripeController.createCustomer)
router.get('/customer-id/:id', stripeController.getCustomer)
// router.post('/create-token', stripeController.createToken)
router.post('/add-card-to-customer', stripeController.addCardToCustomer)
// router.post('/charge-customer', stripeController.chargeCustomerById)
// router.post('/payment-method', stripeController.paymentMethod)
// router.post('/payment-intent', stripeController.paymentIntent)
router.post('/charge-customer', stripeController.chargePayment)
router.post('/create-product', stripeController.createProduct)

module.exports = router