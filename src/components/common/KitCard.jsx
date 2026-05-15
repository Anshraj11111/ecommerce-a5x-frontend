import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../../stores/useCartStore";
import { inr } from "../../config/constants";
import a5xCarKit from "../../assets/a5x-car-kit.jpg";

function KitCard({ kit }) {
  const add = useCartStore((state) => state.add);
  return (
    <article className="kit-card">
      <Link to={`/kits/${kit.id}`} className="kit-card-img-wrap">
        <img src={kit.imageUrl || a5xCarKit} alt={kit.name} />
        <span className="kit-tier-badge">{kit.tier}</span>
      </Link>
      <div className="kit-card-body">
        <h3><Link to={`/kits/${kit.id}`}>{kit.name}</Link></h3>
        <p>{kit.description}</p>
        <div className="kit-card-includes">
          {kit.includes?.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
          {kit.includes?.length > 3 && <span>+{kit.includes.length - 3} more</span>}
        </div>
        <div className="kit-card-footer">
          <strong>{inr(kit.price)}</strong>
          <button onClick={() => add({ ...kit, id: kit.id, name: kit.name, price: kit.price })}>
            <ShoppingCart size={15} /> Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default KitCard;
