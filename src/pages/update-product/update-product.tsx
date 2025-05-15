import React from "react";
import CreateProduct from "../../templates/product";
import { useParams } from "react-router-dom";

type Props = {};

const UpdateProduct = (props: Props) => {
  const { productId } = useParams;

  return <CreateProduct />;
};

export default UpdateProduct;
