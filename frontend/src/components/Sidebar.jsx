function Sidebar({

  setPage,
  page,
  isAdmin

}) {

  const customerMenus = [

    {
      name: "Home",
      icon: "🏠",
      value: "home"
    },

    {
      name: "Checkout",
      icon: "🛒",
      value: "checkout"
    },

    {
      name: "Orders",
      icon: "📦",
      value: "orders"
    },

    {
      name: "Wishlist",
      icon: "❤️",
      value: "wishlist"
    }

  ];

  const adminMenus = [

    {
      name: "Home",
      icon: "🏠",
      value: "home"
    },

    {
      name: "Manage Orders",
      icon: "📦",
      value: "manageOrders"
    },

    {
      name: "Product History",
      icon: "🕘",
      value: "history"
    }

  ];

  const menus =
    isAdmin
      ? adminMenus
      : customerMenus;

  return (

    <div className="sidebar">

      <div className="sidebar-logo">

        <h1>
          ⚡ ShopHub
        </h1>

      </div>

      <div className="sidebar-menu">

        {

          menus.map((menu) => (

            <button

              key={menu.value}

              className={

                page === menu.value

                  ? "sidebar-btn active-side"

                  : "sidebar-btn"
              }

              onClick={() =>
                setPage(menu.value)
              }
            >

              <span className="side-icon">
                {menu.icon}
              </span>

              {menu.name}

            </button>

          ))
        }

      </div>

    </div>
  );
}

export default Sidebar;