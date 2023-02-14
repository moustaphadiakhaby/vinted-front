import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";
import "./CheckoutForm.css";

const CheckoutForm = ({ title, total, id }) => {
  // State qui sert à savoir si ma requête attend toujours une réponse
  const [isLoading, setIsLoading] = useState(false);
  //   State qui set à savoir si le paiement a été effectué
  const [completed, setCompleted] = useState(false);

  // Permetra de créer une requête vers stripe pour obtenir un token
  const stripe = useStripe();
  // Permetra de récupérer les données bancaires de l'utilisateur
  const elements = useElements();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Je fais passer isLoading à true
      setIsLoading(true);
      // Je récupère le contenu de l'input CardElement
      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      //   J'envoie ces informations à stripe pour qu'il valide le code de carte de l'utilisateur et qu'il me renvoie un token.
      const stripeResponse = await stripe.createToken(cardElement, {
        name: id,
      });
      //   console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);
      //   Je fais une requête à mon back en envoyant le stripetoken
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: total,
        }
      );
      console.log(response.data.status);

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
