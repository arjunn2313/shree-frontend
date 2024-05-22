import React from "react";
import { useParams } from "react-router-dom";
import EditProduct from "./EditProduct";
import UpdateImage from "./UpdateImage";
import UpdateStock from "./updateStock";
import NewColor from "./NewColor";

export default function Update() {
  const { action, id } = useParams();

  const displayOption = () => {
    if (action === "details") {
      return <EditProduct />;
    }
    if (action === "images") {
      return <UpdateImage />;
    }
    if (action === "stock") {
      return <UpdateStock />;
    }

    if (action === "newcolor") {
      return <NewColor />;
    }
  };

  return <div>{displayOption()}</div>;
}
