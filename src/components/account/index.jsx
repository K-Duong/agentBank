
import Button from "../button";
import "./style.scss";

function Account({title, availableBalance, handleClick}) {
  

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">${availableBalance}</p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button className="transaction-button" handleClick={handleClick}>View transactions</Button>
      </div>
    </section>
  );
}

export default Account