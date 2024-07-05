import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";
import { useUserState } from "../../hooks/useUserState";
import FormEditName from "../../components/form-edit-profile";
import Button from "../../components/button";
import "./style.scss";
import Account from "../../components/account";

function ProfilePage() {
  // mocked accounts to render
  const listOfAccounts = [
    {
      title: "Argent Bank Checking (x8349)",
      availableBalance: 2082.79
    },
    {
      title: "Argent Bank Savings (x6712)",
      availableBalance: 10928.42
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      availableBalance: 184.30
    }
  ]
  const [activatedForm, setActivatedForm] = useState(false);
  const {isLoading, user} = useUserState();
  const {isAuth} = useAuthState();

  const navigate = useNavigate();

  useEffect(()=>{
    if (!isAuth) navigate("/")
  }, [isAuth]);

  const handleNavigateToTransactionPage = () => {
    navigate("/transactions")
  }

  const handleOpenForm = () => {
    setActivatedForm(true);
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="profile-wrapper">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!activatedForm && `${user.firstName} ${user.lastName}!`}
        </h1>
        {activatedForm ? (
          <FormEditName
            firstName={user.firstName}
            lastName={user.lastName}
            formState={setActivatedForm}
          >
            {" "}
          </FormEditName>
        ) : (
          <Button className="btn-edit-name" handleClick={handleOpenForm}>
            Edit Name
          </Button>
        )}
      </div>
      {listOfAccounts.map(account => <Account title={account.title} availableBalance={account.availableBalance.toLocaleString("en-US")} handleClick={handleNavigateToTransactionPage} key={account.title} ></Account>)}
    </div>
  );
}

export default ProfilePage;
