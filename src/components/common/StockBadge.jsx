import React from "react";

function StockBadge({ stock, count }) {
  if (!stock) return <span className="stock-badge out">Out of Stock</span>;
  if (count <= 10) return <span className="stock-badge low">Low Stock ({count} left)</span>;
  return <span className="stock-badge in">In Stock</span>;
}

export default StockBadge;
