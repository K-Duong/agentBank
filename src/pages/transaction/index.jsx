import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./style.scss";

function TransactionPage() {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => {
    setIsOpened(!isOpened)
  }

  return (
    <div className="transaction-wrapper">
      <header className="transaction-header">
        <h1 className="transaction-header-title">
          Argent Bank Checking (x8349)
        </h1>
        <p className="transaction-header-amount">$2083.79</p>
        <p className="transaction-header-description">Available balance</p>
      </header>
      <section className="transactions-list">
        <div className="transactions-list-titles">
          <p className="date">Date</p>
          <p className="Description">Description</p>
          <p className="Amount">Amount</p>
          <p className="Balance">Balance</p>
        </div>
        <div className="transaction-items">
          <div className="transaction-item">
            <div className="transaction-item-header">
              <div className="dropdown-and-date">
                <FontAwesomeIcon icon={`fa-solid ${isOpened ? 'fa-chevron-up' :'fa-chevron-down' }`} onClick={handleOpen}/>{" "}
                <p className="transaction-item-date">June 20th, 2020</p>
              </div>
              <p className="transaction-item-description">Golden Sun Bakery</p>
              <p className="transaction-item-amount">$5</p>
              <p className="transaction-item-balance">$2083.79</p>
            </div>
            <div className={`transaction-item-details ${!isOpened && "hidden"}`}>
              <div className="transaction-type">
                <p>Transaction Type: Electronic</p>
              </div>
              <div className="transaction-category">
                <label htmlFor="category">Caterogy: </label>
                <select name="category" id="category">
                  <option value="Food">Volvo</option>
                  <option value="Sanity">Saab</option>
                  <option value="Hobby">Mercedes</option>
                  <option value="Vehicul">Audi</option>
                </select>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
              <div className="transaction-notes">
                <label htmlFor="notes">Notes: </label>
                <input type="text" placeholder="note something here"></input>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
            </div>
          </div>

          <div className="transaction-item">
            <div className="transaction-item-header">
              <div className="dropdown-and-date">
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />{" "}
                <p className="transaction-item-date">June 20th, 2020</p>
              </div>
              <p className="transaction-item-description">Golden Sun Bakery</p>
              <p className="transaction-item-amount">$5</p>
              <p className="transaction-item-balance">$2083.79</p>
            </div>
            <div className="transaction-item-details hidden">
              <div className="transaction-type">
                <p>Transaction Type: Electronic</p>
              </div>
              <div className="transaction-category">
                <label htmlFor="category">Caterogy: </label>
                <select name="category" id="category">
                  <option value="Food">Volvo</option>
                  <option value="Sanity">Saab</option>
                  <option value="Hobby">Mercedes</option>
                  <option value="Vehicul">Audi</option>
                </select>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
              <div className="transaction-notes">
                <label htmlFor="notes">Notes: </label>
                <input type="text" placeholder="note something here"></input>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
            </div>
          </div>

          <div className="transaction-item">
            <div className="transaction-item-header">
              <div className="dropdown-and-date">
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />{" "}
                <p className="transaction-item-date">June 20th, 2020</p>
              </div>
              <p className="transaction-item-description">Golden Sun Bakery</p>
              <p className="transaction-item-amount">$5</p>
              <p className="transaction-item-balance">$2083.79</p>
            </div>
            <div className="transaction-item-details hidden">
              <div className="transaction-type">
                <p>Transaction Type: Electronic</p>
              </div>
              <div className="transaction-category">
                <label htmlFor="category">Caterogy: </label>
                <select name="category" id="category">
                  <option value="Food">Volvo</option>
                  <option value="Sanity">Saab</option>
                  <option value="Hobby">Mercedes</option>
                  <option value="Vehicul">Audi</option>
                </select>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
              <div className="transaction-notes">
                <label htmlFor="notes">Notes: </label>
                <input type="text" placeholder="note something here"></input>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
            </div>
          </div>

          <div className="transaction-item">
            <div className="transaction-item-header">
              <div className="dropdown-and-date">
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />{" "}
                <p className="transaction-item-date">June 20th, 2020</p>
              </div>
              <p className="transaction-item-description">Golden Sun Bakery</p>
              <p className="transaction-item-amount">$5</p>
              <p className="transaction-item-balance">$2083.79</p>
            </div>
            <div className="transaction-item-details">
              <div className="transaction-type">
                <p>Transaction Type: Electronic</p>
              </div>
              <div className="transaction-category">
                <label htmlFor="category">Caterogy: </label>
                <select name="category" id="category">
                  <option value="Food">Volvo</option>
                  <option value="Sanity">Saab</option>
                  <option value="Hobby">Mercedes</option>
                  <option value="Vehicul">Audi</option>
                </select>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
              <div className="transaction-notes">
                <label htmlFor="notes">Notes: </label>
                <input type="text" placeholder="note something here"></input>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default TransactionPage;
