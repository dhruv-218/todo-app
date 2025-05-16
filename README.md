# React To-Do List Application

This is a interactive To-Do List application built with React, Vite, and Tailwind CSS, featuring priority of task and sort them also it's animations powered by Framer Motion.

## Preview

Here are some screenshots of the application:

**Initial State:**
![iamge](https://github.com/dhruv-218/todo-app/blob/main/img.jpeg)

**Tasks Added and Sorted:**

![iamge](https://github.com/dhruv-218/todo-app/blob/main/img(1).jpeg)
![iamge](https://github.com/dhruv-218/todo-app/blob/main/img%20(2).jpeg)

## Features

*   **Add Tasks:** Easily add new tasks with a text input and priority selection.
*   **Priority:** Assign a priority (Low, Medium, High) to each task.
*   **Edit Tasks:** Edit the text and priority of existing tasks.
*   **Delete Tasks:** Remove tasks from the list.
*   **Toggle Complete:** Mark tasks as completed or incomplete.
*   **Priority Sort:** Sort tasks by priority (High > Medium > Low), keeping incomplete tasks at the top.
*   **Enter Key Support:** Add a new task by pressing the Enter key in the input field.
*   **Persistence:** Tasks are saved in the browser's local storage.
*   **Animations:** Smooth animations for adding, removing, and updating tasks using Framer Motion.
*   **Responsive Design:** Basic responsiveness using Tailwind CSS.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid styling.
*   **Framer Motion:** A library for production-ready animations for React.
*   **Lucide React:** A library of open-source icons.

## Dependencies

The project uses the following dependencies:

*   `framer-motion`: ^12.11.3
*   `lucide-react`: ^0.510.0
*   `react`: ^19.1.0
*   `react-dom`: ^19.1.0

You can install these dependencies using npm:

```bash
npm install framer-motion lucide-react react react-dom
```

## Installation and Setup

1.  Clone the repository:
    ```bash
    git clone <https://github.com/dhruv-218/todo-app>
    cd todo-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    The application will be available at `http://localhost:5173/` (or another port if 5173 is in use).

4.  Build for production:
    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```

## Demo

![Link of the application]: https://todo-app-three-tau-18.vercel.app

## App structure diagram

![iamge](https://github.com/dhruv-218/todo-app/blob/main/diagram.png)




