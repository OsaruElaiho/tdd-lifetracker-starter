import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NutritionForm.css"
import { useNutritionContext } from "../../../contexts/nutrition" 

export default function NutritionForm({}) {
    const {createNutrition} = useNutritionContext();
    const navigate = useNavigate()
    const [form, setForm] = React.useState({
        name: "",
        category: "",
        quantity: 1,
        calories: 1,
        imageUrl: ""
    });

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async (e) => {
        console.log("nutritionform", form)
        const valid = await createNutrition(form)
        //  works --> navigate
        if (valid){
            navigate("/nutrition");
        } 
    }



    return (
        <div className="nutrition-form">
            <h2>Record Nutrition</h2>
            <div className="form">
                <div className="form-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Nutrition name" value={form.name} onChange={handleOnInputChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" placeholder="Nutrition category" value={form.category} onChange={handleOnInputChange}/>
                </div>
                <div className="split-input-field">
                    <div className="form-input">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" name="quantity" min="1" max="100000000" value={form.quantity} onChange={handleOnInputChange}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="calories">Calories</label>
                        <input type="number" name="calories" min="1" max="100000000" step="10" value={form.calories} onChange={handleOnInputChange}/>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="imageUrl">Image Url</label>
                    <input type="text" name="imageUrl" placeholder="http://www.food-image.com/1" value={form.imageUrl} onChange={handleOnInputChange}/>
                </div>
                <button className="submit-nutrition" onClick={handleOnSubmit}>Save</button>
            </div>
        </div>
    );
}