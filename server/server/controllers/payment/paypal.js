import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_API_CLIENT_ID,
  client_secret: process.env.PAYPAL_API_CLIENT_SECRET,
});

const payForEmployee = async (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:8000/api/payment/paypal/success",
      cancel_url: "http://localhost:8000/api/payment/paypal/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "EmployeezNow",
              sku: "001",
              price: "8.16",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "8.16",
        },
        description: "Buy the Employee Profile",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      return res.status(500).json({
        error: "setting payment error",
      });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          return res.status(200).json({
            redirectUrl: payment.links[i].href,
          });
        }
      }
    }
  });
};

const getPaypalSuccess = async (req, res) => {
  return res.status(200).json({
    success: "successfully paid",
  });
};

const getPaypalCancel = async (req, res) => {
  return res.redirect("http://localhost:3000/paymentsuccess");
};

export default { payForEmployee, getPaypalSuccess, getPaypalCancel };
