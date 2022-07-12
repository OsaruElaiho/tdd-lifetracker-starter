import React from "react"
import ActivityFeed from "components/ActivityPage/ActivityFeed"
import Loading from "../Loading/Loading"
import "./ActivityPage.css"


export default function ActivityPage(props) {
  return (
    <div className="activity-page">
      <div className="content">
        <div className="actions">
          {props.isProcessing ?  <Loading/> 
          : <ActivityFeed user = {props.user} nutritionData = {props.nutritionData} setNutritionData = {props.setNutritionData} isProcessing = {props.isProcessing} setIsProcessing={props.setIsProcessing}/>}
        </div>
        <div className="stats">
        </div>
      </div>
    </div>
  )
}