import { useState, useEffect } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import ProductCard from "./components/ProductCard";
import AddProduct from "./components/AddProduct";

import Checkout from "./pages/CheckOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductModal from "./components/ProductModal";

function App() {

  // PRODUCTS
  const [products, setProducts] = useState([]);

  // EDIT PRODUCT
  const [editingProduct, setEditingProduct] =
    useState(null);

  // SEARCH
  const [search, setSearch] = useState("");

  // CART
  const [cart, setCart] = useState([]);

  // ORDERS
  const [orders, setOrders] = useState([]);

  // WISHLIST
  const [wishlist, setWishlist] = useState([]);

  // PRODUCT HISTORY
  const [productHistory, setProductHistory] =
    useState([]);

  // PAGE
  const [page, setPage] = useState("login");

  // LOGIN
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [isAdmin, setIsAdmin] =
    useState(false);

  // MODAL
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

  try {

    const res = await fetch(
      "http://shophub-backend-env.eba-ivmxrybm.us-east-1.elasticbeanstalk.com/products"
    );

    const data = await res.json();

    console.log(data);

    setProducts(data);

    localStorage.setItem(
      "products",
      JSON.stringify(data)
    );

  } catch (error) {

    console.log(error);
  }
};

  // INITIAL LOAD
  useEffect(() => {

    fetchProducts();

    const loggedIn =
      localStorage.getItem("loggedIn");

    const admin =
      localStorage.getItem("isAdmin");

    if (loggedIn === "true") {

      setIsLoggedIn(true);

      if (admin === "true") {

        setIsAdmin(true);
      }

      setPage("home");
    }

  }, []);

  // ADD TO CART
  const addToCart = (product) => {

    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (exists) {

      const updatedCart = cart.map(
        (item) =>

          item._id === product._id

            ? {
                ...item,
                qty: item.qty + 1
              }

            : item
      );

      setCart(updatedCart);

    } else {

      setCart([

        ...cart,

        {
          ...product,
          qty: 1
        }

      ]);
    }
  };

  // REMOVE CART
  const removeFromCart = (index) => {

    const updated = [...cart];

    updated.splice(index, 1);

    setCart(updated);
  };

  // ADD WISHLIST
  const addToWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) return;

    setWishlist([
      ...wishlist,
      product
    ]);
  };

  // REMOVE WISHLIST
  const removeFromWishlist = (index) => {

    const updated = [...wishlist];

    updated.splice(index, 1);

    setWishlist(updated);
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      const deletedProduct =
        products.find(
          (p) => p._id === id
        );

      await fetch(

        `http://shophub-backend-env.eba-ivmxrybm.us-east-1.elasticbeanstalk.com/delete-product/${id}`,

        {
          method:"DELETE"
        }
      );

      if (deletedProduct) {

        setProductHistory((prev) => [

          ...prev,

          {
            ...deletedProduct,
            action:"Deleted"
          }

        ]);
      }

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  // SEARCH FILTER
  const filteredProducts = Array.isArray(products)

  ? products.filter((product) =>

      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )

  : [];

  return (

    <div className="app-wrapper">

      {/* LOGIN */}
      {

        page === "login" && (

          <Login

            setPage={setPage}

            setIsAdmin={setIsAdmin}

            setIsLoggedIn={setIsLoggedIn}

          />
        )
      }

      {/* REGISTER */}
      {

        page === "register" && (

          <Register
            setPage={setPage}
          />
        )
      }

      {/* MAIN APP */}
      {

        isLoggedIn && page !== "login" && page !== "register" && (

          <>

            <Navbar

              cartCount={cart.length}

              setPage={setPage}

              isAdmin={isAdmin}

              setIsLoggedIn={setIsLoggedIn}

              search={search}

              setSearch={setSearch}

            />

            <div className="main-layout">

              <Sidebar

                setPage={setPage}

                page={page}

                isAdmin={isAdmin}

              />

              <div className="content-area">

                {/* HOME */}
                {

                  page === "home" && (

                    <>

                      {

                        isAdmin && (

                          <AddProduct

                            onProductAdded={
                              fetchProducts
                            }

                            editingProduct={
                              editingProduct
                            }

                            setEditingProduct={
                              setEditingProduct
                            }

                          />
                        )
                      }

                      <div className="product-grid">

                        {

                          filteredProducts.map((p) => (

                            <ProductCard

                              key={p._id}

                              product={p}

                              addToCart={addToCart}

                              addToWishlist={
                                addToWishlist
                              }

                              isAdmin={isAdmin}

                              deleteProduct={
                                deleteProduct
                              }

                              editProduct={
                                setEditingProduct
                              }

                              openModal={
                                setSelectedProduct
                              }

                            />
                          ))
                        }

                      </div>

                    </>
                  )
                }

                {/* CHECKOUT */}
                {

                  page === "checkout" && (

                    <Checkout

  cart={cart}

  setCart={setCart}

  orders={orders}

  setOrders={setOrders}

  setPage={setPage}

  isAdmin={isAdmin}

  products={products}

  setProducts={setProducts}

/>
                  )
                }

                {/* ORDERS */}
                {

                  page === "orders" && (

                    <Orders

                      orders={orders}

                      setPage={setPage}

                    />
                  )
                }

                {/* WISHLIST */}
                {

                  page === "wishlist" && (

                    <Wishlist

                      wishlist={wishlist}

                      removeFromWishlist={
                        removeFromWishlist
                      }

                      setPage={setPage}

                    />
                  )
                }

                {/* MANAGE ORDERS */}
                {

                  page === "manageOrders" && (

                    <Orders

                      orders={orders}

                      setPage={setPage}

                    />
                  )
                }

                {/* PRODUCT HISTORY */}
                {

                  page === "history" && (

                    <div>

                      <h1 className="page-title">
                        🕘 Product History
                      </h1>

                      <div className="orders-grid">

                        {

                          productHistory.map(
                            (item,index)=>(

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
                                    {item.action}
                                  </p>

                                </div>

                              </div>

                            )
                          )
                        }

                      </div>

                    </div>
                  )
                }

              </div>

            </div>

          </>
        )
      }

      {/* PRODUCT MODAL */}
      {

        selectedProduct && (

          <ProductModal

            product={selectedProduct}

            closeModal={() =>
              setSelectedProduct(null)
            }

            addToCart={addToCart}

          />
        )
      }

      <ToastContainer position="top-right" />

    </div>
  );
}

export default App;