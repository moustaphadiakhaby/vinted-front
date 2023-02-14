import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";
import "./CheckoutForm.css";

const CheckoutForm = ({ title, total, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: id,
      });

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: total,
        }
      );

      if (response.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 5000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return total ? (
    <form onSubmit={handleSubmit}>
      {!completed && <CardElement />}

      {completed ? (
        <p>
          Merci pour votre achat. Vous allez être redirigé automatiquement vers
          la page d'accueil.
        </p>
      ) : (
        <button
          disabled={isLoading}
          type="submit"
          className={isLoading ? "pay-disabled" : "pay-button"}
        >
          Payer
        </button>
      )}
    </form>
  ) : (
    <div>
      <p>
        Cet article coûte 0€ appelez directement le vendeur pour récupérer
        l'article :{" "}
      </p>
      <span className="bold underlined">Numéro : 06 42 42 42 42</span>
    </div>
  );
};

export default CheckoutForm;
