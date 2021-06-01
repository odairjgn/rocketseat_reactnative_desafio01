import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleMarkTaskAsDone(id: number) {
    let target = tasks.find(x => x.id === id);

    if (target) {
      target.done = !target.done;
      setTasks(tasks);
    }
  }

  function handleRemoveTask(id: number) {
    let index = tasks.findIndex(x => x.id === id);

    if (index > -1)
      setTasks(tasks.splice(index, 1));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  )
}