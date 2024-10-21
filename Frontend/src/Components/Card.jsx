import React from 'react';
import './Card.css'; 

const Card = ({ imageSrc, text1, text2, text3, onClick }) => {
    return (
        <>
        <div className='card-header'>
            

        </div>
        <div className="card" onClick={onClick}>
            <img src={imageSrc} alt="Card" className="card-image" />
            <div className="card-text1">{text1}</div>
            <div className="card-text2">{text2}</div>
            <div className="card-text3">{text3}</div>
        </div>
        </>
    );
};

export default Card;
