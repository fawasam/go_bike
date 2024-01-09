// Your component file
import React from "react";
import { List, Button, Card } from "antd";
import ZoomableImage from "./zoomableimage";

const ListViewComponent = ({ data }) => {
  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            style={{
              margin: "16px",
              background: "#f0f0f0",
              border: "3px solid #8FDB8F",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {/* Zoomable Image container */}
              <div style={{ flex: "0 0 auto", marginRight: "16px" }}>
                <ZoomableImage src={item.image} alt={item.model} />
              </div>

              {/* Description and buy button container */}
              <div style={{ flex: "1 1 auto" }}>
                <h3 style={{ fontWeight: "bold" }}>{item.model}</h3>
                <p style={{ fontFamily: "Arial, sans-serif" }}>
                  {item.description}
                </p>
                <p>{item.price}/day</p>
                <Button
                  type="primary"
                  style={{ color: "black", background: "#8FDB8F" }}
                >
                  Buy
                </Button>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListViewComponent;
