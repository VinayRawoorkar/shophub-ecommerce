import ProductCard from "../components/ProductCard";

function Home({ products, addToCart }) {
  return (
    <div>
      <h2 style={{ padding: "20px" }}>Electronics</h2>

      <div style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;