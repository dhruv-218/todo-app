import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    const loadedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    return loadedTasks.map(task => ({ ...task, priority: task.priority || 'low' }));
  });
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('low');

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingPriority, setEditingPriority] = useState('');

  const [sortOrder, setSortOrder] = useState('default'); // State for sorting

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority: newTaskPriority }]);
    setNewTask('');
    setNewTaskPriority('low');
    setSortOrder('default'); // Reset sort when adding a new task
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
    setEditingPriority(task.priority);
  };

  const saveTask = (id) => {
    if (editingText.trim() === '') return;
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editingText, priority: editingPriority } : task
    ));
    setEditingTaskId(null);
    setEditingText('');
    setEditingPriority('');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingText('');
    setEditingPriority('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handlePrioritySort = () => {
    const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
    const sortedTasks = [...tasks].sort((a, b) => {
      // Sort by completion status first (incomplete tasks first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then sort by priority
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setTasks(sortedTasks);
    setSortOrder('priority');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md p-8">
        <h1 className="text-4xl font-bold text-left text-rose-600 mb-6">To-Do List</h1>

        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTask}
            className="bg-black text-white px- py-2 rounded w-full"
          >
            Add Task
          </motion.button>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Add Priority Sort Button */}
        <div className="mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrioritySort}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Priority Sort
          </motion.button>
          {/* Optional: Add a button to reset sort */}
          {sortOrder === 'priority' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setTasks([...tasks].sort((a, b) => a.id - b.id)); // Sort by original order (ID)
                setSortOrder('default');
              }}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded text-sm"
            >
              Reset Sort
            </motion.button>
          )}
        </div>

        <ul className="space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col justify-between items-start bg-gray-50 px-4 py-3 rounded shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                {editingTaskId === task.id ? (
                  <div className="flex flex-col w-full gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                    <select
                      value={editingPriority}
                      onChange={(e) => setEditingPriority(e.target.value)}
                      className="border border-gray-300 p-1 rounded w-full text-sm"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <div className="flex gap-2 justify-end w-full">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => saveTask(task.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleComplete(task.id)}>
                      {task.completed && <Check className="text-green-600 w-5 h-5" />}
                      <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.text}
                      </span>
                      <span className={`text-xs font-semibold ml-2 px-1 py-0.5 rounded ${
                        task.priority === 'high' ? 'bg-red-200 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.2, color: '#2563eb' }}
                        onClick={() => editTask(task)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2, color: '#b91c1c' }}
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
