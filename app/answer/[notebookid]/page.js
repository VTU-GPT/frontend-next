import AnswerPage from '@/components/AnswerPage'
import { sql } from '@vercel/postgres'
import React from 'react'
const getNotebookName = async(notebookId) => {
  const resp = await sql`select notebook_name from notebooks where notebook_id=${notebookId}`;
  return resp.rows
}

const page = async ({params}) => {
  const notebookName = await getNotebookName(params.notebookid)
  return (
    <>
    <AnswerPage notebookId = {params.notebookid} notebookName={notebookName[0].notebook_name}/>
    </>
  )
}

export default page