import { useParams } from "react-router-dom";
import KanbanBoard from "../../../components/kanbanBoard/KanbanBoard";



const BoardPage = () => {
  const { projectId } = useParams();
  
  return <KanbanBoard projectId={projectId} />;
};

export default BoardPage;
