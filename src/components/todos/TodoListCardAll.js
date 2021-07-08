import React from 'react';
import { Card, CardBody } from 'reactstrap';
import useLiveData from 'hooks/common/useLiveData';
import CategoryDataService from 'services/CategoryDataService';
import TodoListHeader from './TodoListHeader';
import TodoTable from './TodoTable';

const useLiveCategories = () => {
  return useLiveData({
    getData: CategoryDataService.getAll,
    listen: CategoryDataService.listenChanges,
  });
};

const TodoListCard = ({ todos, setActiveStatus, activeStatus }) => {
  const categories = useLiveCategories();
  return (
    <div>
      <Card className="card-tasks">
        <TodoListHeader setActiveStatus={setActiveStatus} activeStatus={activeStatus} />
        <CardBody>
          <TodoTable todos={todos} />
        </CardBody>
      </Card>
      {categories.map((category) => (
        <Card id={category._id} className="card-tasks">
          <TodoListHeader title={`${category.title}`} setActiveStatus={setActiveStatus} activeStatus={activeStatus} />
          <CardBody>
            <TodoTable todos={todos} category={category._id} />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default TodoListCard;
