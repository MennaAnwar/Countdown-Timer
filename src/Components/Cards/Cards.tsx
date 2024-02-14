import { FC } from "react";
import "./Cards.css";

interface Props {
  number: number | string;
  duration: string;
}

const Cards: FC<Props> = ({ number, duration }) => (
  <div className="item">
    <div className="count">
      <h3 className="title">{number}</h3>
    </div>
    <span>{duration}</span>
  </div>
);

export default Cards;
