function Wishlist({

  wishlist,
  removeFromWishlist

}) {

  return (

    <div>

      <h1 className="page-title">
        ❤️ Wishlist
      </h1>

      {

        wishlist.length === 0 ? (

          <div className="empty-box">

            <h2>
              Wishlist Empty
            </h2>

          </div>

        ) : (

          <div className="orders-grid">

            {

              wishlist.map((item,index)=>(

                <div
                  className="order-card"
                  key={index}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-image"
                  />

                  <div className="order-info">

                    <h2>
                      {item.name}
                    </h2>

                    <p>
                      {item.brand}
                    </p>

                    <h3>
                      ₹ {item.price}
                    </h3>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromWishlist(index)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        )

      }

    </div>
  );
}

export default Wishlist;