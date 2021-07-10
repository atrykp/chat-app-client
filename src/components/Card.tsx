import React from "react";
import "./Card.scss";

interface ICard {
  children: React.ReactNode;
}

const Card = ({ children }: ICard) => (
  <div className="card-wrapper">{children}</div>
);
export default Card;
