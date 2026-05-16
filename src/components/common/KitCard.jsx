import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../stores/useCartStore";
import { inr } from "../../config/constants";
import kitInnovation from "../../assets/kit-innovation.jpg";

function KitCard({ kit }) {
  const add = useCartStore((state) => state.add);
  return (
    <Link to={`/kits/${kit.id}`} className="kit-card glass-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="kit-image">
        <img src={kit.imageUrl || kitInnovation} alt={kit.name} />
        <span className={`tier ${kit.tier.toLowerCase().split(" ")[0]}`}>{kit.tier}</span>
        <span className="rating">★ {kit.rating}</span>
        <div className="kit-image-glow" />
      </div>
      <div className="kit-body">
        <h3>{kit.name}</h3>
        <p>{kit.description}</p>
        <div className="tag-row">{kit.includes.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
        <div className="kit-price">{inr(Number(kit.price))}</div>
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); add({ ...kit, category: "Kits", sku: kit.tier }); }}>Add to Cart</button>
      </div>
    </Link>
  );
}

export default KitCard;
