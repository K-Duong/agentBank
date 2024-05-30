function Button({children, className, handleClick=null, icon=null}) {
  return (
  <div className="btn-container">
    {icon && <img src={icon.src} alt={icon.description}/>}
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  </div>
  )
}

export default Button