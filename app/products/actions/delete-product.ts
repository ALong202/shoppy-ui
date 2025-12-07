export default async function deleteProduct(productId: number) {
  await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
}