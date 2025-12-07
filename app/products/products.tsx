import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";

export default async function Products() {
  const products = await getProducts();

  return (
    // <Grid container spacing={3} sx={{ height: "85vh", overflow: "scroll" }}>
    <ProductsGrid products={products} />

  );
}
