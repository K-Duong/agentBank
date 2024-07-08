import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.scss";
import Button from "../button";
function Transaction({ transaction }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const handleOpen = () => {
    setIsOpened(!isOpened);
  };


  return (
    <>
      <tr className="main-row">
        <td>
          <Button type="button" className={"btn-open-transaction"} handleClick={handleOpen}>
        <FontAwesomeIcon
            icon={`fa-solid ${isOpened ? "fa-chevron-up" : "fa-chevron-down"}`}
            onClick={handleOpen}
          />
        </Button>
        </td>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.balance}</td>
      </tr>
      {isOpened && (
        <tr className="expanded-row">
          <td></td>
          <td className="expanded-row-data" colSpan="4">
            <div>
              <div>Transaction Type: {transaction.transactionType}</div>
              <div className="transaction-category">
                Category:{" "}
                {transaction.transactionDetails.category
                  ? transaction.transactionDetails.category
                  : ""}{" "}
                <Button
                  type="button"
                  className={"btn-edit"}
                >
                  <FontAwesomeIcon icon="fa-solid fa-pencil" />
                </Button>
              </div>
              <div className="transaction-note">
                Note:{" "}
                {transaction.transactionDetails.note
                  ? transaction.transactionDetails.note
                  : ""}{" "}
                 <Button
                  type="button"
                  className={"btn-edit"}
                >
                  <FontAwesomeIcon icon="fa-solid fa-pencil" />
                </Button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default Transaction;
