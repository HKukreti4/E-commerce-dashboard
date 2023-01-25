import React from "react";
import Footer from "./Footer";

const Profile = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  console.log(user);
  return (
    <>
      <div className="container profile">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="user"
        />
        <div className="name">Name : {user.name}</div>
        <div className="name">Email : {user.email}</div>
      </div>
    </>
  );
};

export default Profile;
