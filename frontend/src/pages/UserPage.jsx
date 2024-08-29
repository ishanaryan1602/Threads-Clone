import React from 'react'
import UserHeader from '../Components/UserHeader'
import UserPost from '../Components/UserPost'

export default function UserPage() {
  return (
    <>
        <UserHeader />
        <UserPost likes={100} replies={542} postImg="/post1.png" postTitle="Let's talk about threads." />
        <UserPost likes={324} replies={42} postImg="/post2.png" postTitle="Nice tutorial" />
        <UserPost likes={35} replies={32} postImg="/post3.png" postTitle="I love this guy." />
        <UserPost likes={564} replies={122} postTitle="This is my first thread , excited to be here" />
    </>
  )
}
