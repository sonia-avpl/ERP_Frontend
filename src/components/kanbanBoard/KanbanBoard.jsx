import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utills/enum";


const statusList = ["Todo", "In Progress", "Done"];

const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/tasks/${projectId}`)
      .then((res) => setTasks(res.data));
  }, [projectId]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    // Update status in backend
    const newStatus = destination.droppableId;
    await axios.patch(`${baseUrl}/tasks/${draggableId}`, { status: newStatus });

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleCreateTask = async () => {
    const title = prompt("Enter task title:");
    if (title) {
      const res = await axios.post(`${baseUrl}/tasks`, {
        title,
        projectId,
        status: "Todo",
      });
      setTasks((prev) => [...prev, res.data.task]);
    }
  };

  return (
    <div>
      <button
        onClick={handleCreateTask}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Task
      </button>
      <div className="flex gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {statusList.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded w-1/3 min-h-[300px]"
                >
                  <h3 className="font-bold mb-2">{status}</h3>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task._id}
                        index={index}
                        key={task._id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 rounded shadow mb-2"
                          >
                            {task.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
