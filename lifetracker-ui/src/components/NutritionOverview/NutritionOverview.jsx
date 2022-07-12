import * as React from "react"
import { Link } from "react-router-dom"
import "./NutritionOverview.css"
import Loading from "../Loading/Loading"
import { useNutritionContext } from "../../../contexts/nutrition";
import NutritionFeed from "components/NutritionFeed/NutritionFeed";


export default function NutritionOverview() {
    const { isProcessing, nutritions, newNutrition } = useNutritionContext();

    return (
        <div className="nutrition-overview">
          <div className="header">
                <h3 className = "overview">Overview</h3>
                <button className="Button outline small outline aqua"><Link to ="/nutrition/create">Record Nutrition</Link></button>
          </div>
          <div className="feed">
            { isProcessing ? <Loading/> : <NutritionFeed nutritions={nutritions} newNutrition={newNutrition} />}
          </div>
        </div>
    )
}