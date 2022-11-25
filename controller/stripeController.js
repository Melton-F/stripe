const stripe = require("stripe")(
  "sk_test_51M6q8ISB4tKazm0ByFZZQ2NUJtzDHmeYXlXGLDM7oYPNSMmasQClbuBXAsjG6q6nn2xefxrzLoTkks2Uxwu7PFCx00u8CAdo9S"
);
const { createToken, paymentMeth, getCustomerById, paymentIntent, createProd, createPrice, createCust, createSubscription } = require("../stripeFeatures/stripe-features");

const createCustomer = async (req, res) => {
  try {
    let cusDetls = {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      description: req.body.description
    };
    const customer = await stripe.customers.create(cusDetls);
    res.status(200).json({
      createdCustomer: customer,
    });
  } catch (err) {
    res.send(err.message);
  }

  // var customer = {}

  // customer.email = "mnbTheStar@gmail.com"
  // customer.name = "Melton"
  // customer.description = "node developer"
  // customer.phone = 9942716209

  // await stripe.customers.create({
  //     email:req.body.email,
  //     name:req.body.name,
  //     description:req.body.description,
  //     phone:req.body.phone
  // })
  //     .then(data=>{
  //         res.status(200).json({
  //             customer:data
  //         })
  //     })
  //     .catch(err=>{
  //         res.send(err)
  //     })
};
// createCustomer()

const getCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(req.params.id);
    res.status(200).json({
      customer: customer,
    });
  } catch (err) {
    res.send(err.message);
  }
  // }
};
// getCustomer()

// createToken()

//this method will add card to the customer and add card at the stripe web page

const addCardToCustomer = async (req, res) => {
  try {
    const token = await createToken();
    console.log(token);
    const card = await stripe.customers.createSource(req.body.customerId, {
      source: token.id,
    });
    res.status(200).json({
      message: "card created for customer",
      createdCard: card,
    });
  } catch (err) {
    res.send(err.message);
  }
};

// addCardToCustomer()

const chargeCustomerById = (req, res) => {
  let chargeDetails = {
    amount: "2000",
    currency: "usd",
    description: "First Payment",
    customer: "cus_MqtuK9Fvy0XYvP",
  };

  stripe.charges.create(chargeDetails, (err, charge) => {
    if (err) {
      console.log(err);
    } else if (charge) {
      console.log(charge);
    } else {
      console.log("something wrong");
    }
  });
};

// chargeCustomerById()



// paymentMethod()



// paymentIntent()

const chargePayment = async (req, res) => {
    try{
        const customer = await getCustomerById(req.body.customerId);
        console.log("customer.id" + " "+ customer.id);
        const paymMethod = await paymentMeth();
        const payment = await paymentIntent(customer.id, paymMethod.id);
        console.log("payment");
        res.status(200).json({
        status: true,
        message: "payment charged",
        data: payment,
        });
    }
    catch(err){
        res.send(err.message)
    }
};

const createProduct = async(req, res)=>{
    try {
        const product = await createProd(req.body)
        const price = await createPrice(req.body, product)
        res.status(200).json({
            message:"Product created",
            product:product,
            price:price
        })
    } catch (error) {
        res.send(error.message)
    }
}

const subscribe = async(req, res)=>{
    try {
        const payMeth = await paymentMeth()
        const customer = await createCust(req.body, payMeth.id)
        const subscription = await createSubscription(req.body, payMeth.id, customer)
        res.status(200).json({
            message:"successfully subscripted",
            data:subscription
        })
    } catch (error) {
        
    }
}

module.exports = {
  createCustomer,
  getCustomer,
  createToken,
  addCardToCustomer,
  chargeCustomerById,
  paymentIntent,
  chargePayment,
  createProduct,
  subscribe
};
