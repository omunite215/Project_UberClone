import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount } = body;
  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({
        error: "Please enter a valid email address",
        status: 400,
      })
    );
  }
  let customer;

  const doesCustomerExist = await stripe.customers.list({ email });
  if (doesCustomerExist) {
    customer = doesCustomerExist.data[0];
  } else {
    const newCustomer = await stripe.customers.create({ name, email });
    customer = newCustomer;
  }
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-10-28.acacia" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number.parseInt(amount),
    currency: "inr",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    })
  );
}
