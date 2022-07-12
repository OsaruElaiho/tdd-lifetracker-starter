const Nutrition = require('../models/nutrition')
const { BadRequestError, ForbiddenError } = require("../utils/errors")

const authedUserOwnsNutrition = async (req, res, next) => {
    try {
        const { user } = res.locals
        const { nutritionId } = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)

        // If it doesn't, it should throw a `ForbiddenError` (`403` status code)
        if (nutrition.userEmail !== user.email) {
            throw new ForbiddenError(`User is not allowed to update other users posts.`)
        }

        // If the nutrition instance does belong to the authed user, it should attach it 
        // to the `locals` property of the `response` as its `nutrition` property so that 
        // it doesn't need to be fetched again by the database
        res.locals.nutrition = nutrition
        return next()
    }
    catch (err) {
        return next(err)
    }
}



module.exports = {
    authedUserOwnsNutrition,
}