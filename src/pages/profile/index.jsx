import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      availableBalance: 2082.79,
    },
    {
      title: "Argent Bank Savings (x6712)",
      availableBalance: 10928.42,
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      availableBalance: 184.3,
    },
  ];
  const [activatedForm, setActivatedForm] = useState(false);
  const { isLoading, user } = useUserState();
  const navigate = useNavigate();

  const handleNavigateToTransactionPage = () => {
    navigate("/transactions");
  };

  const handleOpenForm = () => {
    setActivatedForm(true);
  };

  const ProfileContent = () => {
    return (
      <>
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
        {listOfAccounts.map((account) => (
          <Account
            title={account.title}
            availableBalance={account.availableBalance.toLocaleString("en-US")}
            handleClick={handleNavigateToTransactionPage}
            key={account.title}
          ></Account>
        ))}
      </>
    );
  };

  return (
    <div className="profile-wrapper">
      {isLoading ? (
        <h1 className="loading-text">Loading...</h1>
      ) : null}
      {
        !!(user?.firstName && user?.lastName) ? <ProfileContent/> : null
      }
    </div>
  );
}

export default ProfilePage;
