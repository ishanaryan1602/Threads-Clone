// import {
//   Avatar,
//   Box,
//   Button,
//   Divider,
//   Flex,
//   Image,
//   Text,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import Actions from "../Components/Actions";
// import Comment from "../Components/Comment";
// import { useParams } from "react-router-dom";
// import useShowToast from "../hooks/useShowToast";

// export default function PostPage() {

//   // const { user, loading } = useGetUserProfile();
//   const [user, setUser] = useState(null);
//   const { username } = useParams();
//   const showToast = useShowToast();
//   const [posts, setPosts] = useState([]);
//   const [fetchingPosts, setFetchingPosts] = useState(true);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await fetch(`/api/users/profile/${username}`);
//         const data = await res.json();
//         if (data.error) {
//           showToast("Error", data.error, "error");
//           return;
//         }
//         setUser(data);
//       } catch (error) {
//         showToast("Error", error.message, "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     // const getPosts = async () => {
//     //   setFetchingPosts(true);
//     //   try {
//     //     const res = await fetch(`/api/posts/user/${username}`);
//     //     const data = await res.json();
//     //     setPosts(data);
//     //   } catch (error) {
//     //     showToast("Error", error.message, "error");
//     //     setPosts([]);
//     //   } finally {
//     //     setFetchingPosts(false);
//     //   }
//     // };

//     // getPosts();
//     getUser();
//   }, [username, showToast]);

//   return (
//     <>
//       <Flex>
//         <Flex w={"full"} alignItems={"center"} gap={3}>
//           <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg" />
//           <Flex>
//             <Text fontSize={"sm"} fontWeight={"bold"}>
//               markzuckerberg
//             </Text>
//             <Image src="/verified.png" w="4" h={4} ml={4} />
//           </Flex>
//         </Flex>
//         <Flex gap={4} alignItems={"center"}>
//           <Text
//             fontSize={"xs"}
//             width={36}
//             textAlign={"right"}
//             color={"gray.light"}
//           >
//             1d ago
//           </Text>
//           <BsThreeDots />
//         </Flex>
//       </Flex>
//       <Text my={3}>Let's talk about threads</Text>
//       <Box borderRadius={6} overflow={"hidden"}>
//         <Image src="/post1.png" w={"full"} />
//       </Box>
//       <Flex gap={3} my={3}>
//         {/* <Actions post={post} /> */}
//       </Flex>
//       <Flex gap={2} alignItems={"center"}>
//         <Text color={"gray.light"} fontSize={"sm"}>
//           23 replies
//         </Text>
//         <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
//         <Text color={"gray.light"} fontSize={"sm"}>
//           {200 + (liked ? 1 : 0)} likes
//         </Text>
//       </Flex>
//       {/* <Divider my={6} borderColor={"gray.light"} /> */}
//       <Flex justifyContent={"space-between"} my={8}>
//         <Flex gap={2} alignItems={"center"}>
//           <Text fontSize={"2xl"}>👋</Text>
//           <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
//         </Flex>
//         <Button>Get</Button>
//       </Flex>
//       <Divider my={6} borderColor={"gray.light"} />
//       {/* <Box mb={"40px"}></Box> */}
//       {/* <Comment comment="Looks reaally good!" createdAt="1d" likes={100} username="johndoe" userAvatar="https://bit.ly/dan-abramov" />
//       <Comment comment="Just amazing!" createdAt="2d" likes={50} username="mike" userAvatar="https://bit.ly/tioluwani-kolawole" />
//       <Comment comment="Really awesome!" createdAt="2d" likes={21} username="felecia" userAvatar="https://bit.ly/code-beast" /> */}
//     </>
//   );
// }

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Actions from "../Components/Actions";
import { useEffect } from "react";
import Comment from "../Components/Comment";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atoms/postAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;
  console.log("currentPost", currentPost);

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name="Mark Zuckerberg" />
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={1} mt={1} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && (
            <DeleteIcon
              size={20}
              cursor={"pointer"}
              onClick={handleDeletePost}
            />
          )}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>

      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
        >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}
    </>
  );
};

export default PostPage;
