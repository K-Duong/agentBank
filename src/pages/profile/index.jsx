import { useState, useEffect } from "react";
import { useGetUserProfileMutation } from "../../utils/apiSlice";
import { useAuthState } from "../../hooks";
import Button from "../../components/button";
import "./style.scss";
import { useNavigate } from "react-router-dom";

function FormEditName({ handleSubmit, handleCancel, firstName, lastName }) {
  return (
    <form className="form-edit-name">
      <input placeholder={firstName}></input>
      <input placeholder={lastName}></input>
      <Button handleClick={handleSubmit}>Save</Button>
      <Button handleCancel={handleCancel}>Cancel</Button>
    </form>
  );
}
function ProfilePage() {
  const [activatedForm, setActivatedForm] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
  });

  const [fetchError, setFetchError] = useState(null)
  const authState = useAuthState();
  const navigate = useNavigate()
  const [getUserProfile, { isLoading, error }] = useGetUserProfileMutation();

  useEffect(() => {
    const fetchProfile = async () => {
      if (authState.isAuth) {
        try {
        const result = await getUserProfile().unwrap();
        setUserProfile((prev) => ({
          ...prev,
          firstName: result.body.firstName,
          lastName: result.body.lastName,
        }));
      } catch (err) {
        console.error("Failed to fetch user profile: ", err);
        setFetchError("Oops, something went wrong! Please try again")
      }}
    };
    fetchProfile();
  }, [authState.isAuth, getUserProfile, navigate]);

  // useEffect(() => {
  //   if (!authState.isAuth) {
  //     navigate("/");
  //   }
  // }, [authState.isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("save change");
    setActivatedForm(false);
  };

  const handleCancel = () => {
    setActivatedForm(false);
  };

  const handleChangeName = () => {
    console.log("name to change");
    setActivatedForm(true);
  };

  if (isLoading) return <div>Loading...</div>;
  

  return (
    <div className="profile-wrapper">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userProfile?.firstName} {userProfile?.lastName}!
        </h1>
        {activatedForm ? (
          <FormEditName
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            firstName={userProfile.firstName}
            lastName={userProfile.lastName}
          >
            {" "}
          </FormEditName>
        ) : (
          <Button className="edit-button" handleClick={handleChangeName}>
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
