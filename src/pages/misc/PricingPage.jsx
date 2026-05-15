import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { inr } from "../../config/constants";

function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const plans = [
    ["MAKER", 0, ["Access to tutorials", "1 quote/month", "Community forum"]],
    ["BUILDER", 499, ["Unlimited quotes", "Bulk discount 5%", "Priority support", "Project showcase"]],
    ["PRO", 999, ["API access", "Dedicated manager", "10% bulk discount", "Custom kits", "Beta products"]]
  ];
  return (
    <section className="pricing">
      <h2>PRICING</h2>
      <h3>Choose Your Plan</h3>
      <button className="toggle" onClick={() => setYearly(!yearly)}>
        {yearly ? "Yearly" : "Monthly"}
      </button>
      <div className="plans">
        {plans.map(([name, price, list]) => (
          <article key={name}>
            <h4>{name}</h4>
            <AnimatePresence mode="wait">
              <motion.strong
                key={`${name}-${yearly}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {price ? inr(yearly ? price * 10 : price) : "Free"}
                <span>{price ? (yearly ? "/yr" : "/mo") : ""}</span>
              </motion.strong>
            </AnimatePresence>
            {yearly && price > 0 && <p><s>{inr(price * 12)}</s> 2 months free</p>}
            {list.map((item) => (
              <p key={item}><CheckCircle size={15} />{item}</p>
            ))}
            <button>Choose Plan</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingPage() {
  return <main><PricingSection /></main>;
}

export { PricingSection };
export default PricingPage;
