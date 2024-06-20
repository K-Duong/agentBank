import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";
import { useUserState } from "../../hooks/useUserState";
import FormEditName from "../../components/form-edit-profile";
import Button from "../../components/button";
import "./style.scss";

function ProfilePage() {
  //TODO: handle error if id from params # id ?
  const [activatedForm, setActivatedForm] = useState(false);
  const [fetchUserError, setFetchUserError] = useState(false)
  const {isLoading, id, user} = useUserState();
  const {isAuth} = useAuthState();

  const navigate = useNavigate();

  useEffect(()=>{
   if(!isAuth) {
    navigate("/");
   } else if (isAuth && id.length === 0) {
    setFetchUserError(true);
   } else {
    setFetchUserError(false)
   }

  }, [isAuth, id])


  const handleOpenForm = () => {
    setActivatedForm(true);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (fetchUserError) return <h1>User fetching error</h1>

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
          <Button className="btn-edit" handleClick={handleOpenForm}>
            Edit Name
          </Button>
        )}
      </div>
      {/* <h2 class="sr-only">Accounts</h2> */}
      {/* TODO: to map accounts array */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
