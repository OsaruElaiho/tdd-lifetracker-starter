import * as React from "react"
import "./NutritionPage.css"
import NutritionOverview from "components/NutritionOverview/NutritionOverview"
// import NutritionDetail from "components/NutritionDetail/NutritionDetail"
import NutritionNew from "components/NutritionNew/NutritionNew"
import NotFound from "components/NotFound/NotFound"
import { Routes, Route } from "react-router-dom"
import { NutritionContextProvider} from "../../../contexts/nutrition"

export default function NutritionContainer() {
    return (
      <NutritionContextProvider>
        <NutritionPage />
      </NutritionContextProvider>
    )
}

function NutritionPage() {
    return (
        <div className="nutrition-page">
            <div className="Banner"><h1>Nutrition</h1></div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<NutritionOverview/>}/>
                    <Route path="/create" element={<NutritionNew/>}/>
                    {/* <Route path="/id/:nutritionId" element={<NutritionDetail/>}/> */}
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    )
}

