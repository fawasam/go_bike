import axios from "axios";
import React from "react";
import { Card, Button, Row, Col } from "antd";

import { Link } from "react-router-dom";
import { getFullDay } from "../common/date";

const OrderViewComponent = ({ data }) => {
  // http://localhost:5000/api/getBike/659d0e102439db8c605c02b8

  console.log(data);
  return (
    <Row gutter={16}>
      {data?.map((item, i) => (
        <Col key={i} span={8}>
          <Card title={item.bike.model}>
            <img
              src={item.bike.image}
              alt={item.bike.model}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <h2 className="mt-4">{item.bike.type}</h2>

            <p style={{ fontFamily: "Arial, sans-serif" }}>
              {item.description}
            </p>
            <p>Total Cost : {item.cost}</p>
            <p>Rented Date : {getFullDay(item.startDate)}</p>
            <p>Returning Date : {getFullDay(item.endDate)}</p>
            <p className="mt-4">Payment Status :</p>
            <button
              className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5  hover:bg-primary-green hover:border-transparent hover:text-white"
            >
              {item.paymentStatus}
            </button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OrderViewComponent;
