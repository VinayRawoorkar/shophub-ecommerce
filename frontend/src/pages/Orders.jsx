function Orders({ orders }) {

  return (

    <div>

      <h1 className="page-title">
        📦 My Orders
      </h1>

      {

        orders.length === 0 ? (

          <div className="empty-box">

            <h2>
              No Orders Yet
            </h2>

          </div>

        ) : (

          <div className="orders-grid">

            {

              orders.map((item,index)=>(

                <div
                  className="order-card"
                  key={index}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-image"
                  />

                 <div className="order-status">

  <span
    className={`status-badge ${item.status}`}
  >

    {item.status}

  </span>

  <p className="success-line">

    Order placed successfully 🎉

  </p>

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

export default Orders;