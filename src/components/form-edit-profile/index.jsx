import { useState } from "react";

import { useFetchUserState } from "../../hooks/useFetchUserState";
import { useUpdateUserProfileMutation } from "../../utils/apiSlice";

import Button from "../../components/button";
import "./style.scss";

export default function FormEditName({ firstName, lastName, formState }) {
  const [fullName, setFullName] = useState({ firstName, lastName });
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const fetchUserState = useFetchUserState();

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
      await updateUserProfile(fullName).unwrap();
      await fetchUserState();
    } catch (err) {
      console.log("error submit form update profile:", err);
    } finally {
      formState(false);
    }
  };

  const handleCancel = () => {
    formState(false);
  };
  return (
    <form className="form-edit-name">
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
      <Button type="submit" handleClick={handleSubmit}>
        Save
      </Button>
      <Button handleClick={handleCancel}>Cancel</Button>
    </form>
  );
}

// import React,  { useState, useCallback } from "react";
// import { useUpdateUserProfileMutation } from "../../utils/apiSlice";
// import { useFetchUserState } from "../../hooks/useFetchUserState";
// import Button from "../../components/button";
// import "./style.scss";

// function FormEditName({ firstName, lastName, formState }) {
//   const [fullName, setFullName] = useState({ firstName, lastName });
//   const [updateUserProfile] = useUpdateUserProfileMutation();
//   const fetchUserState = useFetchUserState();

//   const handleUpdateFirstName = useCallback((e) => {
//     setFullName((prev) => ({
//       ...prev,
//       firstName: e.target.value,
//     }));
//   }, []);

//   const handleUpdateLastName = useCallback((e) => {
//     setFullName((prev) => ({
//       ...prev,
//       lastName: e.target.value,
//     }));
//   }, []);

//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
//     try {
//       await updateUserProfile(fullName).unwrap();
//       await fetchUserState();
//       formState(false);
//     } catch (err) {
//       console.error("Error submitting form update profile:", err);
//     }
//   }, [fullName, updateUserProfile, fetchUserState, formState]);

//   const handleCancel = useCallback(() => {
//     formState(false);
//   }, [formState]);

//   return (
//     <form className="form-edit-name" onSubmit={handleSubmit}>
//       <input
//         placeholder="First Name"
//         value={fullName.firstName}
//         onChange={handleUpdateFirstName}
//       />
//       <input
//         placeholder="Last Name"
//         value={fullName.lastName}
//         onChange={handleUpdateLastName}
//       />
//       <Button type="submit">Save</Button>
//       <Button type="button" onClick={handleCancel}>Cancel</Button>
//     </form>
//   );
// }

// export default React.memo(FormEditName);
