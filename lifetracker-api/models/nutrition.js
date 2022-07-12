const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Nutrition {

    static async createNutrition({nutrition, user}) {
        const requiredFields = ["name", "category", "calories", "quantity", "imageUrl"]
        requiredFields.forEach(field => {
            if (!nutrition.hasOwnProperty(field)){
                throw new BadRequestError(`Required field - ${field} is missing from request body.`)
            }
        })
        console.log("fields required met")
        const results = await db.query(`
            INSERT INTO nutrition (
                name, 
                category, 
                calories,
                quantity, 
                image_url,
                user_id
                )
                VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
                RETURNING id,
                          name,
                          category,
                          calories,
                          quantity,
                          image_url AS "imageUrl",
                          user_id AS "userId",
                          created_at AS "createdAt"
        `, [nutrition.name, nutrition.category, nutrition.calories, nutrition.quantity, nutrition.imageUrl, user.email])

        return results.rows[0]
    }

    static async fetchNutritionById (nutritionId) {
        const results = await db.query(
            `
                SELECT n.id,
                       n.name,
                       n.category,
                       n.calories,
                       n.quantity,
                       n.image_url,
                       u.email AS "userEmail",
                       n.created_at
                FROM nutrition AS n
                    LEFT JOIN users AS u ON u.id = n.user_id
                WHERE n.id = $1
            `, [nutritionId]
        )
        const nutrition = results.rows[0]
        if (!nutrition) {
            throw new NotFoundError()
        }
        return nutrition
    }

    static async listNutritionForUser(user) {
        const results = await db.query(
            `
                SELECT n.id,
                       n.name,
                       n.category,
                       n.calories,
                       n.quantity,
                       n.image_url,
                       n.created_at,
                       u.email AS "userEmail"
                FROM nutrition AS n
                    RIGHT JOIN users AS u ON u.id = n.user_id
                WHERE u.email = $1
            `, [user.email]
        )
        return results.rows
    }

}

module.exports = Nutrition