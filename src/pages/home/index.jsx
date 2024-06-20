import FeaturesItemsContainer from "../../layouts/features-items-container"
import Hero from "../../layouts/hero";
import './style.scss'

function HomePage () {
  return (
    <div className="home-wrapper">
      <Hero/>
      <FeaturesItemsContainer/>
    </div>
  )
}

export default HomePage