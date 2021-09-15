import React, { useState } from "react";
import "./Card.css";

const Card = ({image}) => {

    const [{angle, xPos, yPos}] = useState({
        angle: Math.floor(Math.random() * (30 - (-30) + 1) ) + (-30),
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20
    })

    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

    return (
        <img className="Card"
            src={image}
            style={{transform}}
        />
    );
};


export default Card;