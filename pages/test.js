import { sql } from '@vercel/postgres'
import React from 'react'
import { GetServerSideProps } from 'next'
const page = ({users}) => {
  return (
    <div>{JSON.stringify(users)}</div>
  )
}
export const getServerSideProps = (async() => {
  const resp = await sql`select * from users;`;
  return {
    props : {
      users : resp.rows
    }
  }
})

export default page 