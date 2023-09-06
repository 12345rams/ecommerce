const catchAsyncErrors = require("../middleware/catchasyncerrors");

const stripe = require("stripe")("sk_test_51Nd54LSAlyqpThaEbS8GviJhvUQoVZvMO7iDwIgXDIHk324JLUITVdmhqW86QAWfAOpmh68zGzl5IW9IzfLRSGsA00Ns6Yzw8N");

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    console.log("hellow")
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Alpha-Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: "pk_test_51Nd54LSAlyqpThaEHcSb52043XuQzXfAXKrCvTIDi5Y8gJOCM6qzu9uNY0j72U9XvbaToFtF55brk42dnj5tDRPq00xlN1QHze"});
});