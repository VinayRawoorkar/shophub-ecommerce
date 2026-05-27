import { useState } from "react";

import { toast } from "react-toastify";

function Checkout({

  cart,
  setCart,

  orders,
  setOrders,

  setPage,

  isAdmin,

  products,
  setProducts

}) {

  const [address, setAddress] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("UPI");

  const total = cart.reduce(

    (sum, item) =>

      sum + item.price * item.qty,

    0
  );
const placeOrder = () => {

  if (cart.length === 0) return;

  if (!address.trim()) {

    toast.error(
      "Please enter delivery address 📍"
    );

    return;
  }

  /* CREATE NEW ORDERS */

  const newOrders = cart.map(
    (item) => ({

      ...item,

      status: "Order Placed 🛒",

      address,

      paymentMethod

    })
  );

  /* SAVE ORDERS */

  setOrders([
    ...orders,
    ...newOrders
  ]);

  /* UPDATE STOCK */

  const updatedProducts = products.map(
    (product) => {

      const orderedItem = cart.find(
        (item) =>
          item._id === product._id
      );

      if (orderedItem) {

        return {

          ...product,

          stock:
            product.stock -
            orderedItem.qty
        };
      }

      return product;
    }
  );

  /* UPDATE PRODUCTS STATE */

  setProducts(updatedProducts);

  /* SAVE TO LOCAL STORAGE */

  localStorage.setItem(
    "products",
    JSON.stringify(updatedProducts)
  );

  /* CLEAR CART */

  setCart([]);

  /* SUCCESS TOAST */

  const messages = [

    "🎉 Order placed successfully! Your items are on the way 🚚",

    "✅ Payment confirmed! Thanks for shopping with ShopHub 💜",

    "🛍️ Your order has been received successfully!",

    "🚀 Order confirmed! Estimated delivery soon.",

    "💜 Thank you for shopping with ShopHub!"

  ];

  const randomMessage =

    messages[
      Math.floor(
        Math.random() *
        messages.length
      )
    ];

  toast.success(
    randomMessage,
    {
      position: "top-right",
      autoClose: 3000,
      theme: "colored"
    }
  );

  /* GO TO ORDERS PAGE */

  setTimeout(() => {

    setPage("orders");

  }, 1500);
};
  
  return (

    <div className="main-layout">

      <div className="content-area">

        <h1 className="page-title">
          🛒 Checkout
        </h1>

        <div className="checkout-box">

          {

            cart.length === 0 ? (

              <div className="empty-box">

                <h2>
                  Cart Empty
                </h2>

              </div>

            ) : (

              <>

                {

                  cart.map((item,index)=>(

                    <div
                      className="checkout-item"
                      key={index}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>

                        <h2>
                          {item.name}
                        </h2>

                        <h3>
                          ₹ {item.price}
                        </h3>

                        <p>
                          Qty : {item.qty}
                        </p>
                        <button

  className="checkout-remove-btn"

  onClick={() => {

    const updatedCart = cart.filter(
      (cartItem) => cartItem._id !== item._id
    );

    setCart(updatedCart);

  }}

>

  ✖

</button>
                      </div>

                    </div>

                  ))

                }

                {/* ADDRESS */}

                <div className="payment-section">

                  <label>
                    Delivery Address
                  </label>

                  <textarea

                    className="address-box"

                    placeholder="Enter full address..."

                    value={address}

                    onChange={(e)=>
                      setAddress(e.target.value)
                    }

                  />

                </div>

                {/* PAYMENT */}

                <div className="payment-section">

                  <label>
                    Payment Method
                  </label>

                  <select

                    className="payment-select"

                    value={paymentMethod}

                    onChange={(e)=>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  >

                    <option>
                      UPI
                    </option>

                    <option>
                      Credit Card
                    </option>

                    <option>
                      Debit Card
                    </option>

                    <option>
                      Cash On Delivery
                    </option>

                  </select>

                </div>

                <h1 className="checkout-total">

                  Total: ₹ {total}

                </h1>

                <button

                  className="place-order-btn"

                  onClick={placeOrder}

                >

                  Place Order

                </button>

              </>

            )

          }

        </div>

      </div>

    </div>
  );
}

export default Checkout;