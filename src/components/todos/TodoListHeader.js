import React from 'react';
import { CardHeader, Button, ButtonGroup } from 'reactstrap';

const actions = [
  {
    label: 'All',
    name: 'all',
  },
  {
    label: 'Open',
    name: 'open',
  },
  {
    label: 'Closed',
    name: 'close',
  },
];
const TodoListHeader = ({ title, /* activeStatus, */ setActiveStatus }) => {
  return (
    <CardHeader>
      <h6 className="title d-inline">{title}</h6>
      {/* <p className="card-category d-inline"> today</p> */}
      <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
        {actions.map((action) => (
          <Button
            key={action.name}
            tag="label"
            className="btn-simple"
            color="info"
            id="0"
            size="sm"
            onClick={() => setActiveStatus(action.name)}
          >
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">{action.label}</span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-single-02" />
            </span>
          </Button>
        ))}
      </ButtonGroup>
    </CardHeader>
  );
};

export default TodoListHeader;
