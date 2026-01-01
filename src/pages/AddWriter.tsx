import WriterForm from '../components/writer/WriterForm'
import type { writerRequest } from '../dataModel/writer'
import { useNavigate } from 'react-router-dom'
import { useAddWriterMutation } from '../services/writerAPI'

const AddWriter = () => {
    const [addWriter]  = useAddWriterMutation()
    const navigate=useNavigate()
    const addedWriter = async (data: writerRequest) => { 
        try {
            await addWriter(data).unwrap();
            navigate("/writer")
        } catch (error) { 
            console.error(error)
        }
       
    }
  return (
      <WriterForm onSubmit={addedWriter} defaultValues={{}} type="Add"/>
  )
}

export default AddWriter
