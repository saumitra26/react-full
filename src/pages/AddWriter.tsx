import React from 'react'
import WriterForm from '../components/writer/WriterForm'
import type { writerRequest } from '../dataModel/writer'
import { useWriter } from '../context/WriterContext'
import { useNavigate } from 'react-router-dom'

const AddWriter = () => {
    const { addedWriter } = useWriter()
    const navigate=useNavigate()
    const addWriter = async (data: writerRequest) => { 
        try {
            await addedWriter(data);
            navigate("/writer")
        } catch (error) { 
            console.error(error)
        }
       
    }
  return (
      <WriterForm onSubmit={addWriter} defaultValues={{}} type="Add"/>
  )
}

export default AddWriter