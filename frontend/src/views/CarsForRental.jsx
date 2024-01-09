import React, { createContext, useContext, useEffect, useState } from "react";
import { Button } from "antd";
import ListViewComponent from "./ListViewComponent";
import GridViewComponent from "./GridViewComponent";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import ikru from "../assets/ikru.jpg";
import passion from "../assets/passion.jpg";
import vespa from "../assets/vespa.jpg";
import pulser from "../assets/pulser.jpg";
import passion2 from "../assets/passion2.jpg";
import passion3 from "../assets/passion3.jpg";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { BikeContext } from "../App";
const productData = [
  {
    id: 1,
    name: "Access 125",
    image: ikru,
    price: 60,
    description: "Owned by jinan muhammed MCA",
  },
  {
    id: 2,
    name: "Passion pro",
    image: passion,
    price: 120,
    description: "Owned by jinan muhammed MCA",
  },
  {
    id: 3,
    name: "Vespa",
    image: vespa,
    price: 100,
    description: "Owned by jinan muhammed MCA",
  },
  {
    id: 4,
    name: "Pulser 150",
    image: pulser,
    price: 100,
    description: "Owned by jinan muhammed MCA",
  },
  {
    id: 5,
    name: "Passion",
    image: passion2,
    price: 100,
    description: "Owned by jinan muhammed MCA",
  },
  {
    id: 6,
    name: "Passion1",
    image: passion3,
    price: 100,
    description: "Owned by jinan muhammed MCA",
  },
];

export const bikeStructure = {
  _id: "",
  user: "",
  model: "",
  type: "",
  brand: "",
  year: "",
  price: "",
  color: "",
  description: "",
  image: "",
  available: "",
  isVerified: "",
};

export const BlogContext = createContext({});
const CarsForRental = () => {
  const [viewType, setViewType] = useState("list");
  const { bikesData, setBikesData } = useContext(BikeContext);

  const getAllBikesData = () => {
    axios
      .get("http://localhost:5000/api/getAllBikes")
      .then(({ data: { bikes } }) => {
        setBikesData({ ...bikesData, bikes });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    getAllBikesData();
  }, []);
  console.log(bikesData);

  return (
    <div className="pt-36">
      <div className="wrapper">
        <h1 className="head_text mb-9 text-center">
          Bikes for <span className="green_text">rental</span>
        </h1>

        {/* Add buttons for switching between list view and grid view */}
        <center>
          <Button
            size="large"
            icon={<UnorderedListOutlined style={{ fontSize: "1.5rem" }} />}
            onClick={() => setViewType("list")}
          ></Button>
          <Button
            size="large"
            icon={<AppstoreOutlined style={{ fontSize: "1.5rem" }} />}
            onClick={() => setViewType("grid")}
          ></Button>
        </center>
        {/* Render either ListViewComponent or GridViewComponent based on the viewType state */}
        {viewType === "list" ? (
          <ListViewComponent data={bikesData.bikes} />
        ) : (
          <GridViewComponent data={bikesData.bikes} />
        )}
      </div>
    </div>
  );
};

export default CarsForRental;
