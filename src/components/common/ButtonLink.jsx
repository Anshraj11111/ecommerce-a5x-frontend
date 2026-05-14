import React from "react";
import { Link } from "react-router-dom";

function ButtonLink({ to, children, ghost }) {
  return <Link to={to} className={`btn${ghost ? " btn-ghost" : ""}`}>{children}</Link>;
}

export default ButtonLink;
