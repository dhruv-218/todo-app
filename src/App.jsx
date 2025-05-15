// import React, { useState, useEffect } from 'react';

// export default function TodoApp() {
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });
//   const [newTask, setNewTask] = useState('');

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = () => {
//     if (newTask.trim() === '') return;
//     setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
//     setNewTask('');
//   };

//   const toggleComplete = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   return (
//     // <div className="min-h-screen bg-white">
//     <div className="min-h-screen flex items-center justify-center bg-white">
//   {/* Your To-Do List content goes here */}


//       <div className="max-w-xs p-8">
//         <h1 className="text-4xl font-bold text-left text-rose-600 mb-6">To-Do List</h1>
        
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add a new task"
//             className="border border-gray-300 p-2 rounded w-full"
//           />
//           <button
//             onClick={addTask}
//             className="bg-black text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>
        
//         <div className="border-t border-gray-200 my-4"></div>
        
//         <ul className="space-y-2">
//           {tasks.map((task) => (
//             <li
//               key={task.id}
//               className="flex justify-between items-center"
//             >
//               <span
//                 onClick={() => toggleComplete(task.id)}
//                 className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
//               >
//                 {task.text}
//               </span>
//               <button
//                 onClick={() => deleteTask(task.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }












































import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xs p-8">
        <h1 className="text-4xl font-bold text-left text-rose-600 mb-6">To-Do List</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTask}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </motion.button>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <ul className="space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex justify-between items-center bg-gray-50 px-2 py-1 rounded shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleComplete(task.id)}>
                  {task.completed && <Check className="text-green-600 w-5 h-5" />}
                  <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2, color: '#b91c1c' }}
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
