import Transaction from "../../components/transaction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthState } from "../../hooks/useAuthState";

import "./style.scss";

function TransactionPage() {
  // mocked transactions to map
  const transactions = [
    {
      id: 1,
      type: "withdrawal",
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$5.00",
      balance: "$2082.79",
      transactionType: "alimentation",
      transactionDetails: {
        category: "food",
        note: "cake for anniversary",
      },
    },
    {
      id: 2,
      type: "withdrawal",
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$10.00",
      balance: "$2087.79",
      transactionType: "alimentation",
      transactionDetails: {
        category: "food",
        note: "cake for anniversary",
      },
    },
    {
      id: 3,
      type: "withdrawal",
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$20.00",
      balance: "$2097.79",
      transactionType: "alimentation",
      transactionDetails: {
        category: "food",
        note: "cake for anniversary",
      },
    },
    {
      id: 4,
      type: "withdrawal",
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$30.00",
      balance: "$2117.79",
      transactionType: "alimentation",
      transactionDetails: {
        category: "food",
        note: "cake for anniversary",
      },

    },
    {
      id: 5,
      type: "withdrawal",
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$40.00",
      balance: "$2147.79",
      transactionType: "alimentation",
      transactionDetails: {
        category: "food",
        note: "cake for anniversary",
      },
    },
    {
      id: 6,
      type: "withdrawal",
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$50.00",
      balance: "$2187.79",
      transactionType: "alimentation",
      transactionDetails: {
        category: "food",
        note: "cake for anniversary",

      },
    },
  ];
  const navigate = useNavigate();
  const {isAuth} = useAuthState();
  useEffect(()=>{
    if (!isAuth) navigate("/")
  }, [isAuth]);

  return (
    <div className="transaction-wrapper">
      <header className="transaction-header">
        <h1 className="transaction-header-title">
          Argent Bank Checking (x8349)
        </h1>
        <p className="transaction-header-amount">$2083.79</p>
        <p className="transaction-header-description">Available balance</p>
      </header>
      <section className="transactions-list" >
      <table >
        <thead>
          <tr className="transactions-list-titles">
            <th></th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => <Transaction transaction={transaction} key={transaction.id}/>)}
        </tbody>
      </table>
      </section>
    </div>
  );
}
export default TransactionPage;
