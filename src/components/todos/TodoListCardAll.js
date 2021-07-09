import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import useLiveData from 'hooks/common/useLiveData';
import CategoryDataService from 'services/CategoryDataService';
import TodoListHeader from './TodoListHeader';
import TodoTable from './TodoTable';

const Search = (props) => {
  return (
    <input
      onChange={({ target: { value } }) => props.search(value)}
      className="form-control"
      type="text"
      placeholder="Search here..."
    />
  );
};

const TodoListCard = ({ todos, setActiveStatus, activeStatus }) => {
  const [filtered, setFiltered] = useState([]);

  useEffect(
    (_) => {
      setFiltered(todos);
    },
    [todos],
  );

  const search = (val) => {
    let currentTodos = [];
    let newList = [];
    if (val !== '') {
      currentTodos = todos;
      newList = currentTodos.filter((todo) => {
        const lc = todo.message.toLowerCase();
        const filter = val.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = todos;
    }
    setFiltered(newList);
  };
  return (
    <div>
      <Search {...{ search }} />
      <Card className="card-tasks">
        <TodoListHeader setActiveStatus={setActiveStatus} activeStatus={activeStatus} />
        <CardBody>
          <TodoTable todos={filtered} />
        </CardBody>
      </Card>
    </div>
  );
};

export default TodoListCard;
