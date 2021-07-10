import React from "react";
import style from "./Card.module.css";

interface ICard {
  children: React.ReactNode;
}

const Card = ({ children }: ICard) => (
  <div className={style.wrapper}>{children}</div>
);
export default Card;
