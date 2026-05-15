import React from "react";

function CategoryTabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={active === tab ? "active" : ""}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
