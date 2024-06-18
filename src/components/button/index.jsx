import "./style.scss";

function Button({children, className, type="button", handleClick=null, icon=null}) {
  return (
    <button className={className} type={type} onClick={handleClick}>
      {children}
    </button>
 
  )
}

export default Button