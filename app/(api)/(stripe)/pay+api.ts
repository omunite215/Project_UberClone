import { Stripe } from "stripe";

// biome-ignore lint/style/noNonNullAssertion: API KEYS
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payment_method_id, payment_intent_id, customer_id } = body;

    if (!payment_method_id || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({
          error: "Missing required payment information.",
          status: 400,
        })
      );
    }
    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      {
        customer: customer_id,
      }
    );
    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment confirmed sucessfully",
        result: result,
      })
    );
  } catch (error) {
    console.error(error);
    JSON.stringify({
      error: error,
      status: 500,
    });
  }
}
