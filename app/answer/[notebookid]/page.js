import AnswerPage from '@/components/AnswerPage'
import React from 'react'

const page = ({params}) => {
  return (
    <>
    <AnswerPage notebookId = {params.notebookid}/>
    </>
  )
}

export default page