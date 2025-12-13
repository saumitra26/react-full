
import { useNavigate, useParams } from "react-router-dom";
import type { writerRequest } from "../dataModel/writer";
import WriterForm from "../components/writer/WriterForm";
import { useGetWriterByIdQuery, useUpdateWriterMutation } from "../services/writerAPI";

const EditWriter = () => {

  const { id } = useParams();
  const writerId = Number(id);
  const navigate = useNavigate();
  const { data: writer } = useGetWriterByIdQuery(writerId)
  console.log('test',writer)
  const [updateWriter] = useUpdateWriterMutation();

  const updateWriterInfo = async (data: writerRequest) => {
      try {
        console.log('testEitWriter',writerId,data)
        await updateWriter({id:writerId,payload:data}).unwrap();
      navigate(`/writer/${writerId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WriterForm onSubmit={updateWriterInfo} defaultValues={writer ?? {}} type="Edit" />
  );
};

export default EditWriter;