function Cart({
  cart,
  removeFromCart,
  setPage
}) {

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price,
    0
  );

  return (

    <div className="cart-box">

      <h2>
        Cart 🛒 ({cart.length})
      </h2>

      {cart.length === 0 ? (

        <p>
          Cart is empty
        </p>

      ) : (

        cart.map((item) => (

          <div
            key={item._id}
            className="cart-item"
          >

            <div>

              {item.name}
              {" "}
              - ₹ {item.price}

            </div>

            <button
              className="cart-remove-btn"
              onClick={() =>
                removeFromCart(item._id)
              }
            >

              Remove

            </button>

          </div>
        ))
      )}

      <h2>
        Total: ₹ {total}
      </h2>

      <button
        className="checkout-btn"
        onClick={() =>
          setPage("checkout")
        }
      >

        Proceed to Checkout

      </button>

    </div>
  );
}

export default Cart;