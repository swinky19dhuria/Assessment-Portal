// import React, { useState, useEffect } from 'react';
// import { Button, Form, Table } from 'react-bootstrap';
// import axios from 'axios';

// function TaskDashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [editTaskId, setEditTaskId] = useState(null); // Track the task being edited
//   const [editedTask, setEditedTask] = useState({}); // Store the edited task values
//   const [newTask, setNewTask] = useState({
//     name: '',
//     description: '',
//     dueDate: '',
//     priority: 'low',
//     status: 'incomplete',
//     assignee: ''
//   }); // Store the new task data

//   // Fetch tasks when the component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await axios.get('http://localhost:8081/tasks');
//         setTasks(res.data);
//       } catch (err) {
//         console.error("Error fetching tasks:", err);
//       }
//     };
//     fetchTasks();
//   }, []);

//   // Handle task creation
//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8081/tasks', newTask);
//       setTasks([...tasks, res.data]); // Add the new task to the task list
//       setNewTask({
//         name: '',
//         description: '',
//         dueDate: '',
//         priority: 'low',
//         status: 'incomplete',
//         assignee: ''
//       }); // Reset the new task form
//     } catch (err) {
//       console.error("Error creating task:", err);
//     }
//   };

//   // Handle editing a task
//   const handleEditClick = (task) => {
//     setEditTaskId(task.id); // Set the current editing task ID
//     setEditedTask(task); // Set the task values in the form
//   };

//   // Handle task field changes during editing
//   const handleEditChange = (e) => {
//     setEditedTask({
//       ...editedTask,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle updating a task
//   const handleSaveChanges = async (taskId) => {
//     try {
//       await axios.put(`http://localhost:8081/tasks/${taskId}`, editedTask);
//       setTasks(tasks.map((task) => (task.id === taskId ? editedTask : task))); // Update task in state
//       setEditTaskId(null); // Exit edit mode
//     } catch (err) {
//       console.error("Error updating task:", err);
//     }
//   };

//   // Handle deleting a task
//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8081/tasks/${id}`);
//       setTasks(tasks.filter((task) => task.id !== id)); // Remove the deleted task from the list
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Task Dashboard</h2>

//       {/* Task Creation Form */}
//       <Form onSubmit={handleCreateTask} className="my-4">
//         <Form.Group className="mb-3" controlId="formTaskName">
//           <Form.Label>Task Name</Form.Label>
//           <Form.Control 
//             type="text" 
//             placeholder="Enter task name" 
//             value={newTask.name} 
//             onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} 
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formDescription">
//           <Form.Label>Description</Form.Label>
//           <Form.Control 
//             as="textarea" 
//             placeholder="Enter task description" 
//             value={newTask.description} 
//             onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formDueDate">
//           <Form.Label>Due Date</Form.Label>
//           <Form.Control 
//             type="date" 
//             value={newTask.dueDate} 
//             onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formPriority">
//           <Form.Label>Priority</Form.Label>
//           <Form.Control
//             as="select"
//             value={newTask.priority}
//             onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </Form.Control>
//         </Form.Group>
        
//         <Form.Group className="mb-3" controlId="formStatus">
//           <Form.Label>Status</Form.Label>
//           <Form.Control
//             as="select"
//             value={newTask.status}
//             onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
//           >
//             <option value="incomplete">Incomplete</option>
//             <option value="completed">Completed</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formAssignee">
//           <Form.Label>Assignee</Form.Label>
//           <Form.Control 
//             type="text" 
//             placeholder="Enter assignee" 
//             value={newTask.assignee} 
//             onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })} 
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Create Task
//         </Button>
//       </Form>

//       {/* Task List */}
//       <h3>Task List</h3>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Task Name</th>
//             <th>Description</th>
//             <th>Due Date</th>
//             <th>Priority</th>
//             <th>Status</th>
//             <th>Assignee</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task, index) => (
//             <tr key={task.id}>
//               <td>{index + 1}</td>
//               <td>
//                 {editTaskId === task.id ? (
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={editedTask.name}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   task.name
//                 )}
//               </td>
//               <td>
//                 {editTaskId === task.id ? (
//                   <Form.Control
//                     as="textarea"
//                     name="description"
//                     value={editedTask.description}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   task.description
//                 )}
//               </td>
//               <td>
//                 {editTaskId === task.id ? (
//                   <Form.Control
//                     type="date"
//                     name="dueDate"
//                     value={editedTask.dueDate}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   task.dueDate
//                 )}
//               </td>
//               <td>
//                 {editTaskId === task.id ? (
//                   <Form.Control
//                     as="select"
//                     name="priority"
//                     value={editedTask.priority}
//                     onChange={handleEditChange}
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                   </Form.Control>
//                 ) : (
//                   task.priority
//                 )}
//               </td>
//               <td>
//                 {editTaskId === task.id ? (
//                   <Form.Control
//                     as="select"
//                     name="status"
//                     value={editedTask.status}
//                     onChange={handleEditChange}
//                   >
//                     <option value="incomplete">Incomplete</option>
//                     <option value="completed">Completed</option>
//                   </Form.Control>
//                 ) : (
//                   task.status
//                 )}
//               </td>
//               <td>
//                 {editTaskId === task.id ? (
//                   <Form.Control
//                     type="text"
//                     name="assignee"
//                     value={editedTask.assignee}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   task.assignee
//                 )}
//               </td>
//               <td>
//                 {editTaskId === task.id ? (
//                   <Button
//                     variant="success"
//                     className="me-2"
//                     onClick={() => handleSaveChanges(task.id)}
//                   >
//                     Save Changes
//                   </Button>
//                 ) : (
//                   <Button
//                     variant="warning"
//                     className="me-2"
//                     onClick={() => handleEditClick(task)}
//                   >
//                     Edit
//                   </Button>
//                 )}
//                 <Button variant="danger" onClick={() => deleteTask(task.id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default TaskDashboard;

import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null); // Track the task being edited
  const [editedTask, setEditedTask] = useState({}); // Store the edited task values
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'incomplete',
    assignee: ''
  }); // Store the new task data

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:8081/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token for fetching tasks
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Handle task creation
  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the JWT token

    try {
      const res = await axios.post('http://localhost:8081/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });
      setTasks([...tasks, res.data]); // Add the new task to the task list
      setNewTask({
        name: '',
        description: '',
        dueDate: '',
        priority: 'low',
        status: 'incomplete',
        assignee: ''
      }); // Reset the new task form
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Handle editing a task
  const handleEditClick = (task) => {
    setEditTaskId(task.id); // Set the current editing task ID
    setEditedTask(task); // Set the task values in the form
  };

  // Handle task field changes during editing
  const handleEditChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  // Handle updating a task
  const handleSaveChanges = async (taskId) => {
    const token = localStorage.getItem("token"); // Get the JWT token
    try {
      await axios.put(`http://localhost:8081/tasks/${taskId}`, editedTask, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });
      setTasks(tasks.map((task) => (task.id === taskId ? editedTask : task))); // Update task in state
      setEditTaskId(null); // Exit edit mode
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Handle deleting a task
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token"); // Get the JWT token
    try {
      await axios.delete(`http://localhost:8081/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });
      setTasks(tasks.filter((task) => task.id !== id)); // Remove the deleted task from the list
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Task Dashboard</h2>

      {/* Task Creation Form */}
      <Form onSubmit={handleCreateTask} className="my-4">
        <Form.Group className="mb-3" controlId="formTaskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter task name" 
            value={newTask.name} 
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Enter task description" 
            value={newTask.description} 
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control 
            type="date" 
            value={newTask.dueDate} 
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Control>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAssignee">
          <Form.Label>Assignee</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter assignee" 
            value={newTask.assignee} 
            onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>

      {/* Task List */}
      <h3>Task List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>
                {editTaskId === task.id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedTask.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  task.name
                )}
              </td>
              <td>
                {editTaskId === task.id ? (
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={editedTask.description}
                    onChange={handleEditChange}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editTaskId === task.id ? (
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={editedTask.dueDate}
                    onChange={handleEditChange}
                  />
                ) : (
                  task.dueDate
                )}
              </td>
              <td>
                {editTaskId === task.id ? (
                  <Form.Control
                    as="select"
                    name="priority"
                    value={editedTask.priority}
                    onChange={handleEditChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Control>
                ) : (
                  task.priority
                )}
              </td>
              <td>
                {editTaskId === task.id ? (
                  <Form.Control
                    as="select"
                    name="status"
                    value={editedTask.status}
                    onChange={handleEditChange}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="completed">Completed</option>
                  </Form.Control>
                ) : (
                  task.status
                )}
              </td>
              <td>
                {editTaskId === task.id ? (
                  <Form.Control
                    type="text"
                    name="assignee"
                    value={editedTask.assignee}
                    onChange={handleEditChange}
                  />
                ) : (
                  task.assignee
                )}
              </td>
              <td>
                {editTaskId === task.id ? (
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => handleSaveChanges(task.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </Button>
                )}
                <Button variant="danger" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TaskDashboard;
