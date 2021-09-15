import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css"


const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);

    useEffect(() => {
        async function getDeck() {
            let d = await axios.get(`${API_BASE_URL}/new/shuffle`);
            setDeck(d.data)
        };
        getDeck();
    }, [setDeck]);


    async function drawCard() {
        try {
            if (drawn.length === 52) {
                return alert("Error: No cards remaining!");
            };

            let c = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/?count=1`);
            setDrawn(drawn => [...drawn, c.data]);
        } catch (e) {
            alert(e);
        }
    };


    const cardComponents = drawn.map(card => (
        <Card
            key={card.cards[0].code}
            image={card.cards[0].image}
        />
    ));

    return (

        <div>
            <div className="Deck-header">
                <button className="Deck-button" onClick={drawCard}>Gimme a Card</button>
            </div>
            <div>
                {cardComponents}
            </div>
        </div>

    );
}


export default Deck;