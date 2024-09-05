import React, { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
import UserPost from "../Components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

export default function UserPage() {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const { username } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };
    getUser();
  }, [username]);

  if(!user) return null; 

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={100}
        replies={542}
        postImg="/post1.png"
        postTitle="Let's talk about threads."
      />
      <UserPost
        likes={324}
        replies={42}
        postImg="/post2.png"
        postTitle="Nice tutorial"
      />
      <UserPost
        likes={35}
        replies={32}
        postImg="/post3.png"
        postTitle="I love this guy."
      />
      <UserPost
        likes={564}
        replies={122}
        postTitle="This is my first thread , excited to be here"
      />
    </>
  );
}
