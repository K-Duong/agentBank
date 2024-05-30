import './style.scss';

function FeatureItem({src,alt, title, description}) {
  return (
    <div className="feature-item">
      <img src={src} alt={alt} className="feature-item-img" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default FeatureItem