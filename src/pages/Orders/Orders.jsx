/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../pages/Layout/Layout";
import { db } from "../../utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import css from "./Orders.module.css";
import ProductCard from "../../components/Product/ProductCard";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"; // Import modular Firestore functions

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      return () => unsubscribe(); // Cleanup subscription on unmount
    } else {
      setOrders([]);
    }
  }, [user]); // Add user as dependency

  return (
    <Layout>
      <section className={css.container}>
        <div className={css.orders__container}>
          <h2>Your Orders</h2>
          {orders.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have any orders yet</div>
          )}
          <div>
            {orders.map((eachOrder, i) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder.data.basket.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
