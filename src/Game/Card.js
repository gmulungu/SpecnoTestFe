import React from "react";

function Card({ item, handleSelectedCards, toggled, stopflip }) {
    return ( 
        <div className="item">
            { item?.cardDetails?.inGame ? (
            <div className={toggled ? "toggled" : ""}>
                <img className="face" src={item.cardDetails.imageUrl} alt="face" />
                <div 
                    className="back" 
                    onClick={() => handleSelectedCards(item)}
                > 
                    {" "} 
                </div> 
            </div>
            ) : (
                <div className="hidden">
                    <img className="face" src={item.cardDetails.imageUrl} alt="face" />
                    <div
                        className="back"
                        onClick={() => handleSelectedCards(item)}
                    >
                        {" "}
                    </div>
                </div>
            )}
        </div> 
    ); 
} 
  
export default Card; 
