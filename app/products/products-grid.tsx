"use client";

import { useEffect } from "react";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Socket, io } from "socket.io-client";
import { API_URL } from "../common/constants/api";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/actions/get-authentication";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async () => {
       socket = io(API_URL!, {
        auth: {
          authentication: await getAuthentication(),
        },
      });

      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <Grid
      container
      spacing={3}
      className="max-h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
    >
      {products.map((product) => (
        <Grid key={product.id} sm={6} lg={4} xs={12}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
