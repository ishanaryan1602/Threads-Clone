import { Avatar, Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

export default function Post({ post, userId }) {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useToast();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + post.postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        console.error(error);
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };
    getUser();
  }, [userId]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user) return null;

  return (
    <Link to={`/${user.username}/post/${user._id}`}>
      <Flex gap={5} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size="md"
            name={user.usernmae}
            src={user.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[0].profilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              ></Avatar>
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[1].profilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              ></Avatar>
            )}
            {post.replies[2] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[2].profilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
              ></Avatar>
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                color={"gray.light"}
                minWidth={"90px"}
                textAlign={"right"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentUser?._id === user._id && (
                <DeleteIcon size={20} onClick={handleDeletePost} />
              )}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img ? (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              //   border={"1px solid"}
              //   borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          ) : null}
          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
          {/* <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm">
              {post.replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              {post.likes.length} likes
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </Link>
  );
}
