const stripe = require("stripe")(
    "sk_test_51M6q8ISB4tKazm0ByFZZQ2NUJtzDHmeYXlXGLDM7oYPNSMmasQClbuBXAsjG6q6nn2xefxrzLoTkks2Uxwu7PFCx00u8CAdo9S"
  );

const createToken = async(req,res)=>{
    try{
        var tokenForCard = {}

        tokenForCard.card = {
            number: '4242 4242 4242 4242',
            exp_month: 1,
            exp_year: 2025,
            cvc: '215'
        }
    
        const token = await stripe.tokens.create(tokenForCard)
        return token
    }
    catch(err){
        console.log(err)
    }
}

const createCust = async(data, method)=>{
    const customer = stripe.customers.create(data)
}

const getCustomerById = async (customerID) => {
    const customer = await stripe.customers.retrieve(customerID);
    return customer
}

const paymentMeth = (req, res) => {
    let cardForPay = {
      type: "card",
      card: {
        number: "4242 4242 4242 4242",
        exp_month: 10,
        exp_year: 2023,
        cvc: "314",
      },
    };
  
    const cardPay = stripe.paymentMethods.create(cardForPay)
    return cardPay
};

const paymentIntent = async(customerID, payMethID) => {
    let params = {
      amount: 100,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customerID,
      setup_future_usage: "off_session",
      payment_method: payMethID,
      confirm: true,
      description : "First payment"
    };
  
    const payInt = await stripe.paymentIntents.create(params);
    console.log(payInt);
    return payInt
  };


const createProd = async({product_name, product_description})=>{
    try {
        const product = stripe.products.create({
            name:product_name,
            description:product_description
        })
        return product
    } catch (error) {
        console.log(error)
    }
}

const createPrice = async({currency, price, interval, interval_count}, {id})=>{
    try {
        const priceForPdt = stripe.prices.create({
            unit_amount : price,
            currency:currency,
            recurring: {
                interval:interval,
                interval_count:interval_count
            },
            product:id
        })
        return priceForPdt
    } catch (error) {
        
    }
}

const createSubscription = async({price, trial_period_days}, payMethId, {id})=>{
    try {
        let datas = {
            customer:id,
            items:[{price:price}],
            trial_period_days:trial_period_days,
            off_session: true,
            payment_settings:{
                payment_method_types:['card']
            },
            collection_method:"charge_automatically",
            payment_behavior:"allow_incomplete",
            default_payment_method:payMethId.id
        }
    
        const subscribe = stripe.subscriptions.create(datas)
        return subscribe
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createToken, getCustomerById, paymentMeth, paymentIntent, createProd, createPrice, createCust, createSubscription
}