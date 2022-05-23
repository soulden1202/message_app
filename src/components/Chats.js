import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../Firebase";
import { useAuth } from "../contexts/AuthContext";
import SendBirdApp from "@sendbird/uikit-react/App";
import axios from "axios";
import "@sendbird/uikit-react/dist/index.css";
import { CommonLoading } from "react-loadingg";
import EditUserProfile from "@sendbird/uikit-react/EditUserProfile";

const Chats = () => {
  const history = useHistory();
  const app_id = process.env.REACT_APP_CHAT_ID;

  const [loading, setloading] = useState(true);

  const { user } = useAuth();

  const handleLogout = async () => {
    auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userProfile.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    console.log(user);

    const getrq = `https://api-${app_id}.sendbird.com/v3/users/${user.uid}`;
    const postrq = `https://api-${app_id}.sendbird.com/v3/users`;

    axios
      .get(getrq, {
        headers: {
          "Api-Token": "" + process.env.REACT_APP_CHAT_API,
        },
      })
      .then(() => {
        setloading(false);
      })
      .catch((error) => {
        let formdata = new FormData();

        formdata.append("user_id", user.email);
        formdata.append("nickname", user.displayName);
        formdata.append("profile_url", user.photoURL);

        axios
          .post(postrq, formdata, {
            headers: {
              "Api-Token": "" + process.env.REACT_APP_CHAT_API,
            },
          })
          .then(() => setloading(false))
          .catch((error) => {
            console.log(error);
          });
      });
  });

  if (!user || loading)
    return (
      <div className="mainpage loading">
        <CommonLoading size="large" color="#FFFFFF" />
      </div>
    );
  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">WhateverChat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <div className="App">
        <SendBirdApp
          // Add the two lines below.

          appId={process.env.REACT_APP_CHAT_ID} // Specify your Sendbird application ID.
          userId={user.email} // Specify your user ID.
          theme={"dark"}
          allowProfileEdit={true}
          showSearchIcon={true}
        />
      </div>
    </div>
  );
};

export default Chats;
