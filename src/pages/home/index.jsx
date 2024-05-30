import FeaturesItemsContainer from "../../layouts/features-items-container"
import Hero from "../../layouts/hero"

function HomePage () {
  return (
    <div className="home-wrapper">
      <Hero/>
      <FeaturesItemsContainer/>
    </div>
  )
}

export default HomePage