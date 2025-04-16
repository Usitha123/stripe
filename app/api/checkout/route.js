import Stripe from 'stripe';

// Only initialize Stripe when the function is called
// This prevents build-time errors when env vars aren't available
export async function POST() {
  // Initialize Stripe inside the function
  const stripe = process.env.STRIPE_SECRET_KEY 
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;
    
  // Check if Stripe is properly initialized
  if (!stripe) {
    return Response.json({ error: 'Stripe API key is missing' }, { status: 500 });
  }
  
  try {
    const { line_items } = await req.json();
    
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'BR'],
      },
      success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}