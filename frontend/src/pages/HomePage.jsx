import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Link to={"/ishan"}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx={"auto"}>Visit Profile Page</Button>
        </Flex>
    </Link>
  )
}

export default HomePage