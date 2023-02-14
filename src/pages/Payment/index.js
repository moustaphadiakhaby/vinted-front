import "./Payment.css";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  const location = useLocation();
  const { title, price, id } = location.state;

  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  const buyerProtection = Number(((price * 10) / 100).toFixed(2));
  const shippingFees = Number((((price * 10) / 100) * 2).toFixed(2));

  const total = price + buyerProtection + shippingFees;

  return (
    <div className="Payment">
      <div className="payment-container">
        <div className="payment-card summary">
          <div className="title">Résumé de la commande</div>
          <div className="content">
            <ul>
              <li>
                Commande <span>{price} €</span>
              </li>
              <li>
                Frais protection acheteurs <span>{buyerProtection} €</span>
              </li>
              <li>
                Frais de port <span>{shippingFees} €</span>
              </li>
            </ul>
          </div>
          <div className="divider"></div>
          <div className="content">
            <ul>
              <li className="bold">
                Total <span>{total} €</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="payment-card">
          <div className="content">
            <div>
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <span className="bold">{title}</span>. Vous allez payer{" "}
              <span className="bold">{total} €</span> (frais de protection et
              frais de port inclus).
            </div>
            <div className="divider"></div>
            <Elements stripe={stripePromise}>
              <CheckoutForm total={total} title={title} id={id} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
