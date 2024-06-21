import { useState } from "react";

import { userLoadedSuccessfully } from "../../features/userSlice";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useUpdateUserProfileMutation } from "../../utils/apiSlice";

import Button from "../../components/button";
import "./style.scss";

export default function FormEditName({ firstName, lastName, formState }) {
  const [fullName, setFullName] = useState({ firstName, lastName });
  const [errorMessage, setErrorMessage] = useState("");
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const dispatchUserLoadedSucessfully = useDispatchAction(
    userLoadedSuccessfully
  );

  const handleUpdateFirstName = (e) => {
    setFullName((prev) => {
      return {
        ...prev,
        firstName: e.target.value,
      };
    });
  };
  const handleUpdateLastName = (e) => {
    setFullName((prev) => {
      return {
        ...prev,
        lastName: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfile(fullName).unwrap();
      if (res.status === 200) {
        dispatchUserLoadedSucessfully(fullName);
      }
      formState(false);
    } catch (err) {
      console.log("error submit form update profile:", err);
      setErrorMessage("Something went wrong 🙄");
      formState(true);
    }
  };

  const handleCancel = () => {
    formState(false);
  };

  return (
    <form className="form-edit-name">
      {errorMessage.length > 0 ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        ""
      )}
      <div className="inputs-edit-name">
        <input
          placeholder={fullName.firstName}
          value={fullName.firstName}
          onChange={handleUpdateFirstName}
        ></input>
        <input
          placeholder={fullName.lastName}
          value={fullName.lastName}
          onChange={handleUpdateLastName}
        ></input>
      </div>
      <div className="btns-form">
        <Button type="submit" handleClick={handleSubmit}>
          Save
        </Button>
        <Button handleClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  );
}
