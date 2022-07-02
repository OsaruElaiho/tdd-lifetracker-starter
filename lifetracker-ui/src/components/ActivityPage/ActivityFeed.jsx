import React from "react"
import "./ActivityFeed.css"
import "./SummaryStat"

export default function ActivityFeed({totalCaloriesPerDay, avgCaloriesPerCategory}) {

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