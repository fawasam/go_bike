// GridViewComponent.jsx
import React from "react";
import { Card, Button, Row, Col } from "antd";
import ikru from "../assets/ikru.jpg";
import passion from "../assets/passion.jpg";
import vespa from "../assets/vespa.jpg";
import pulser from "../assets/pulser.jpg";
import passion2 from "../assets/passion2.jpg";
import passion3 from "../assets/passion3.jpg";

const GridViewComponent = ({ data }) => {
  return (
    <Row gutter={16}>
      {data.map((item) => (
        <Col key={item.id} span={8}>
          <Card title={item.model}>
            {/* Use the image filename directly */}
            <img
              src={item.image}
              alt={item.model}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <p>{item.description}</p>
            <Button type="primary">Buy</Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GridViewComponent;
