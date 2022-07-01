import { Link } from "react-router-dom"
import "./Landing.css"

export default function Landing() {

  return (
    <div className="landing-page">
        <div className="hero">
            <img className="hero-img" src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg" alt="hero-img" />
            <div className="cta">
                <h1>Life Tracker</h1>
                <p>Helping you take back control of your world</p>
            </div>
        </div>
    </div>
  )
}