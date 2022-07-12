import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./ActivityFeed.css"
import "./SummaryStat"
import apiClient from "../../../services/apiClient"


export default function ActivityFeed(props) {
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchNutritionData = async () => {
          const {data, error} = await apiClient.fetchCalorieStats()
          if(data){
            console.log("data", data.nutrition)
            props.setNutritionData(data.nutrition)
          }
          if(error){
            setError(error)
          }
        }
        fetchNutritionData()
      }, [])

    return (
    <div className="activity-feed">
        <div className="per-category">
            <h4>Average Calories Per Category</h4>
            {/* <SummaryStat></SummaryStat> */}
        </div>
        <div>

        </div>
    </div>
  )
}