import * as React from "react"
import "./NutritionFeed.css";
import NutritionCard from "components/NutritionCard/NutritionCard";


export default function NutritionFeed({nutritions = []}) {
  
  const numItems = nutritions.length
  return (
      <div className="nutrition-feed">
          {numItems > 0 ? <div className="cards">
              {nutritions.map((nutrition) => <NutritionCard key={nutrition.id} nutrition={nutrition}/>)}
          </div> : <h1 className="empty-message">Nothing Here Yet</h1>}
      </div>
  );
}