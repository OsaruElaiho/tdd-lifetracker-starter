const db = require("../db")

class Activity {
    static async calculateDailyCaloriesSummaryStats(user) {
        const results = await db.query(`
            SELECT n.created_at::date AS "date",
            SUM(calories * quantity) AS "totalCaloriesPerDay"
            FROM nutrition AS n
                LEFT JOIN users AS u ON u.id = n.user_id 
            WHERE u.email = $1
            GROUP BY DATE(n.created_at);
        `, [user.email]
      )
      return results.rows


    }

    static async calculatePerCategoryCaloriesSummaryStats(user) {
        const results = await db.query(`
            SELECT n.category AS "category",
            ROUND(AVG(calories*quantity)) AS "avgCaloriesPerCategory"
            FROM nutrition AS n
                LEFT JOIN users AS u ON u.id = n.user_id
            WHERE u.email = $1
            GROUP BY n.category;
        
        
        `, [user.email])
        return results.rows


        
    }
}

module.exports = Activity