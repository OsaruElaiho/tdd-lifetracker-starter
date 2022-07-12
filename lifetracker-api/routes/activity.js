const express = require("express")
const Activity = require("../models/activity")
const security = require("../middleware/security")
// const permissions = require("../middleware/permissions")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //send json response back to client with summary stats for nutrition resource
        const { user } = res.locals
        const dailyCalories = await Activity.calculateDailyCaloriesSummaryStats(user)
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(user)
        return res.status(201).json({ "nutrition": { "calories": {"perDay": dailyCalories, "perCategory": perCategory}  } })
    }
    catch(err) {
        next(err)
    }
})

module.exports = router