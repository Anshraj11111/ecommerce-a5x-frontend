import { Link } from "react-router-dom";
import useCartStore from "../../stores/useCartStore";
import { inr } from "../../config/constants";
import kitInnovation from "../../assets/kit-innovation.jpg";

function KitCard({ kit }) {
  const add = useCartStore((state) => state.add);

  return (
    <Link to={`/kits/${kit.id}`} className="kit-card-v2" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Image - fixed height, object-fit cover */}
      <div className="kit-card-v2-img">
        <img src={kit.imageUrl || kitInnovation} alt={kit.name} />
        <span className={`kit-card-v2-tier tier ${kit.tier.toLowerCase().split(" ")[0]}`}>{kit.tier}</span>
        <span className="kit-card-v2-rating">★ {kit.rating}</span>
      </div>

      {/* Body */}
      <div className="kit-card-v2-body">
        {/* Title - max 2 lines */}
        <h3 className="kit-card-v2-title">{kit.name}</h3>

        {/* Description - max 2 lines, truncated */}
        <p className="kit-card-v2-desc">{kit.description}</p>

        {/* Footer: price + button */}
        <div className="kit-card-v2-footer">
          <div className="kit-card-v2-price">{inr(Number(kit.price))}</div>
          <button
            className="kit-card-v2-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              add({ ...kit, category: "Kits", sku: kit.tier });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default KitCard;
