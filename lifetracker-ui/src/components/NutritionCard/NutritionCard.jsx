import * as React from "react";
import "./NutritionCard.css";

export default function NutritionCard({nutrition = {}}) {
    console.log(nutrition)
    const date = new Date(nutrition?.created_at);
    const formattedDate = date.toDateString()
    
    return (
        <div className="nutrition-card">
            <div className="card-header">
                <img className="nutrition-image" src={nutrition?.image_url} alt="" />
                <div className="nutrition-name"><h2>{nutrition?.name}</h2></div>
            </div>
            <div className="card-stats">
                <div className="CardStat">
                    <div className="nutrition-calories">Calories: {nutrition?.calories}</div>
                </div>
                <div className="CardStat">
                    <div className="nutrition-quantity">Quantity: {nutrition?.quantity}</div>
                </div>
            </div>
            <div className="card-meta">
                <div className="nutrition-category">Category: {nutrition?.category}</div>
                
                <div className="nutrition-date">Date Added: {formattedDate}</div>
            </div>  
        </div>
    );
}