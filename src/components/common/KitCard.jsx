import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import useCartStore from "../../stores/useCartStore";
import { inr } from "../../config/constants";
import kitInnovation from "../../assets/kit-innovation.jpg";

function KitCard({ kit, listView }) {
  const add = useCartStore((state) => state.add);
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add({ ...kit, category: "Kits", sku: kit.tier });
    navigate('/checkout');
  };

  if (listView) {
    return (
      <Link to={`/kits/${kit.id}`} className="kit-card-list" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="kit-card-list-img">
          <img src={kit.imageUrl || kitInnovation} alt={kit.name} />
          <span className={`kit-card-v2-tier tier ${kit.tier.toLowerCase().split(" ")[0]}`}>{kit.tier}</span>
        </div>
        <div className="kit-card-list-body">
          <h3 className="kit-card-v2-title">{kit.name}</h3>
          <p className="kit-card-v2-desc">{kit.description}</p>
        </div>
        <div className="kit-card-list-footer">
          <span className="kit-card-v2-rating">★ {kit.rating}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            {!!kit.mrp && Number(kit.mrp) > 0 && (
              <s style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', fontWeight: '500' }}>
                {inr(Number(kit.mrp))}
              </s>
            )}
            <div className="kit-card-v2-price">{inr(Number(kit.price))}</div>
            {!!kit.mrp && Number(kit.mrp) > Number(kit.price) && (
              <span style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', fontSize: '10px', fontWeight: '800', padding: '1px 5px', borderRadius: '4px' }}>
                {Math.round((1 - kit.price / kit.mrp) * 100)}% OFF
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="kit-card-v2-btn"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); add({ ...kit, category: "Kits", sku: kit.tier }); }}
            >
              Add to Cart
            </button>
            <button
              className="kit-card-v2-btn"
              onClick={handleBuyNow}
              style={{ background: 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)', color: '#000', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Zap size={14} />
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/kits/${kit.id}`} className="kit-card-v2" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Image - fixed height, object-fit cover */}
      <div className="kit-card-v2-img">
        <img
          src={kit.imageUrl || kitInnovation}
          alt={kit.name}
          loading="lazy"
          decoding="async"
          width="300"
          height="160"
        />
        <span className={`kit-card-v2-tier tier ${kit.tier.toLowerCase().split(" ")[0]}`}>{kit.tier}</span>
      </div>

      {/* Body */}
      <div className="kit-card-v2-body">
        {/* Title - max 2 lines */}
        <h3 className="kit-card-v2-title">{kit.name}</h3>

        {/* Description - max 2 lines, truncated */}
        <p className="kit-card-v2-desc">{kit.description}</p>

        {/* Footer: price + rating + button */}
        <div className="kit-card-v2-footer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
              {!!kit.mrp && Number(kit.mrp) > 0 && (
                <s style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', fontWeight: '500' }}>
                  {inr(Number(kit.mrp))}
                </s>
              )}
              <div className="kit-card-v2-price">{inr(Number(kit.price))}</div>
              {!!kit.mrp && Number(kit.mrp) > Number(kit.price) && (
                <span style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', fontSize: '10px', fontWeight: '800', padding: '1px 5px', borderRadius: '4px' }}>
                  {Math.round((1 - kit.price / kit.mrp) * 100)}% OFF
                </span>
              )}
            </div>
            <span style={{ color: '#fbbf24', fontSize: '11px', fontWeight: '700' }}>★ {kit.rating}</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
            <button
              className="kit-card-v2-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                add({ ...kit, category: "Kits", sku: kit.tier });
              }}
              style={{ flex: 1 }}
            >
              Add to Cart
            </button>
            <button
              className="kit-card-v2-btn"
              onClick={handleBuyNow}
              style={{ flex: 1, background: 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            >
              <Zap size={14} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default KitCard;
