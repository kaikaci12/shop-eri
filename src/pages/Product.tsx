import React from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const product = useParams();
  console.log(product);
  return <div>Single Product</div>;
}
