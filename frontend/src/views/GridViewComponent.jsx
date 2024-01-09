// GridViewComponent.jsx
import React from "react";
import { Card, Button, Row, Col } from "antd";
import ikru from "../assets/ikru.jpg";
import passion from "../assets/passion.jpg";
import vespa from "../assets/vespa.jpg";
import pulser from "../assets/pulser.jpg";
import passion2 from "../assets/passion2.jpg";
import passion3 from "../assets/passion3.jpg";
import { Link } from "react-router-dom";

const GridViewComponent = ({ data }) => {
  return (
    <Row gutter={16}>
      {data?.map((item) => (
        <Col key={item.id} span={8}>
          <Card title={item.model}>
            <Link to={`/bike/${item._id}`}>
              {/* Use the image filename directly */}
              <img
                src={item.image}
                alt={item.model}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
              <h2 className="mt-4">{item.type}</h2>
              <h2>Available - {item.available ? "yes" : "no"}</h2>
              <p style={{ fontFamily: "Arial, sans-serif" }}>
                {item.description}
              </p>
              <p>{item.price}/day</p>
              <Button type="primary">Buy</Button>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GridViewComponent;
