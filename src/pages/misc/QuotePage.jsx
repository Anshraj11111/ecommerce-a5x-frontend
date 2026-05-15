import React from "react";
import useCartStore from "../../stores/useCartStore";

function GenericPage({ title, text, children }) {
  return (
    <main className="page generic">
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
    </main>
  );
}

function QuotePage() {
  return (
    <GenericPage
      title="Request Quote"
      text="Your cart drawer holds quote items. Submit your build list and we will verify stock and pricing."
    >
      <button className="btn" onClick={useCartStore.getState().toggle}>
        Open Quote Drawer
      </button>
    </GenericPage>
  );
}

export { GenericPage };
export default QuotePage;
