import { toast } from "react-toastify";

function Navbar({

  cartCount,
  setPage,
  isAdmin,
  setIsLoggedIn,
  search,
  setSearch

}) {

  const userName =
    localStorage.getItem("userName");

  // LOGOUT
  const handleLogout = () => {

    const handleLogout = () => {

  localStorage.removeItem("loggedIn");

  localStorage.removeItem("isAdmin");

  localStorage.removeItem("userName");

  setIsLoggedIn(false);

  toast.success(
    "👋 Logged out successfully!",
    {
      position: "top-right",
      autoClose: 2000,
      theme: "colored"
    }
  );

  setTimeout(() => {

    setPage("login");

  }, 1000);
};

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);

    toast.success(
      "Logged out successfully 👋"
    );

    setPage("login");
  };

  return (

    <div className="navbar">

      {/* LEFT */}
      <div
        className="nav-left"
        onClick={() => setPage("home")}
      >

        <h1 className="logo">
          ⚡ ShopHub
        </h1>

      </div>

      {/* CENTER */}
      <div className="nav-center">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-bar"
        />

      </div>

      {/* RIGHT */}
      <div className="nav-right">

      
        <div className="user-box">
          👤 {userName}
        </div>

        {!isAdmin && (

          <button
            className="nav-cart-btn"
            onClick={() =>
              setPage("checkout")
            }
          >

            🛒 Cart

            <span className="cart-count">
              {cartCount}
            </span>

          </button>

        )}

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;