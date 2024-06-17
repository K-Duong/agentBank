import './style.scss'
function MainContainer({children}){
  return (
    <div className="main-container">
      {children}
    </div>
  )
}
export default MainContainer