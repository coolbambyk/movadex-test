import React from 'react';
import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import TodoListHeader from './TodoListHeader';
import TodoTable from './TodoTable';

const TodoListCard = ({ title, todos, setActiveStatus, activeStatus, categoryId }) => {
  return (
    <Card className="card-tasks">
      <TodoListHeader
        title={`${title} (${todos.length})`}
        setActiveStatus={setActiveStatus}
        activeStatus={activeStatus}
      />
      <CardBody>
        <TodoTable todos={todos} category={categoryId} />
      </CardBody>
    </Card>
  );
};

TodoListCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TodoListCard;
