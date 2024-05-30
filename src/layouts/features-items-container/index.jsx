import iconChat from "../../assets/icons/icon-chat.png";
import iconMoney from "../../assets/icons/icon-money.png";
import iconSecurity from "../../assets/icons/icon-security.png";


import FeatureItem from '../../components/feature-item';
import './style.scss';

function FeaturesItemsContainer () {

  const features = [
    {
      src: iconChat,
      alt: "Chat Icon",
      title:"You are our #1 priority",
      description:" Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
      src: iconMoney,
      alt: "Money Icon",
      title:"Security you can trust",
      description:"The more you save with us, the higher your interest rate will be!"
    },
    {
      src: iconSecurity,
      alt: "Security Icon",
      title:"More savings means higher rates",
      description:"We use top of the line encryption to make sure your data and money is always safe."
    },

    

  ]
  return (
    <section className="features-items-container">
      {features.map(({src, alt, title, description }) => {
        return <FeatureItem key={alt} src={src} alt={alt} title={title} description={description}/>
        })}
    </section>
  )
}

export default FeaturesItemsContainer;