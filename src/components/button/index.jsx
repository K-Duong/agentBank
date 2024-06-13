import "./style.scss";

function Button({children, className, handleClick=null, icon=null}) {
  return (
  
    <button className={className} onClick={handleClick}>
      {children}
    </button>
 
  )
}

export default Button