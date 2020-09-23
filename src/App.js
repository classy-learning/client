import AppRouter from "bits/AppRouter";
import AuthWrapper from "bits/AuthWrapper";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const PUBLISHABLE_STRIPE_KEY =
  "pk_test_51H6rIkIw1gARdZqqtmeFOSI8nsqdyHQAtH2XRAkSMSkzCz5AZCPwsUU1BVPqFOa8uwrFihNrMjEkAC7NkEHI7gsF00MxWZlulW";

const stripePromise = loadStripe(PUBLISHABLE_STRIPE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <AuthWrapper>
        <AppRouter></AppRouter>
      </AuthWrapper>
    </Elements>
  );
}

export default App;
