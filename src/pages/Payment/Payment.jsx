import React, { useContext, useState } from "react";
import Layout from "../../pages/Layout/Layout.jsx";
import css from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard.jsx";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat.jsx";
import { axiosInstance } from "../../api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase.js";
import { useNavigate } from "react-router-dom";
import Type from "../../utility/action.type.js";
import { collection, doc, setDoc } from "firebase/firestore";
const Payment = () => {
  let [paymentError, setPaymentError] = useState("");
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      setPaymentError(null);

      const response = await axiosInstance({
        method: "POST",
        url: `/payments/create`,
        data: {
          total: Math.round(total * 100),
        },
      });

      if (!response.data?.clientSecret) {
        throw new Error("Failed to retrieve client secret from payment API");
      }

      const clientSecret = response.data.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Use modular Firestore syntax
      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* Header  */}
      <div className={css.payment__header}>Checkout ({totalItem}) items</div>
      {/* payment method  */}
      <section className={css.Payment}>
        {/* address  */}
        <div className={css.flex}>
          <h3>Delivery Address </h3>
          <div>
            <div>{user?.email}</div>
            <div>123, React, Lane</div>
            <div>Chicago</div>
          </div>
        </div>
        <hr />
        {/* products  */}
        <div className={css.flex}>
          <h3>Review items and delivery </h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} key={item.id} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form  */}
        <div className={css.flex}>
          <h3>Payment Methods</h3>
          <div className={css.payment__card__container}>
            <div className={css.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error  */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element  */}
                <CardElement onChange={handleChange} />
                {/* price  */}
                <div className={css.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={css.loading}>
                        <ClipLoader color="blue" size={12} /> <p>Please Wait</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
