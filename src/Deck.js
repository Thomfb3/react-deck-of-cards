import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css"


const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function getDeck() {
            let d = await axios.get(`${API_BASE_URL}/new/shuffle`);
            setDeck(d.data)
        };
        getDeck();
    }, [setDeck]);


    useEffect(() => {


        async function drawCard() {
            try {
                let card = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw`);

                if (card.data.remaining === 0) {
                    setAutoDraw(false)
                    setDeck(null)
                    return alert("Error: No cards remaining!");
                };

                setDrawn(drawn => [...drawn, card.data]);

            } catch (e) {
                alert(e);
            }
        };

        if (autoDraw && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await drawCard();
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };

    }, [autoDraw, setAutoDraw, deck]);



  const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto);
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
            { deck ? (
                <button className="Deck-button" onClick={toggleAutoDraw}>{autoDraw ? "STOP Drawing" : "Auto Draw"}</button>
            ) : null}
            </div>
            <div>
                {cardComponents}
            </div>
        </div>

    );
}


export default Deck;