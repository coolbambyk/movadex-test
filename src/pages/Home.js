import React, { Fragment, useState } from 'react';
import useLiveTodos from 'hooks/todos/useLiveTodos';
import TodoListCardAll from '../components/todos/TodoListCardAll';
import TodoForm from '../components/todos/TodoForm';

export default function HomePage() {
  const [activeStatus, setActiveStatus] = useState('open');
  const todos = useLiveTodos({ status: activeStatus });
  return (
    <>
      <TodoForm />
      <TodoListCardAll title="All Todos" {...{ todos, activeStatus, setActiveStatus }} />
    </>
  );
}
