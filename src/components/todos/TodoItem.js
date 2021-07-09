import React, { Fragment, useState } from 'react';
import { Button, FormGroup, UncontrolledTooltip, Label, Modal, ModalBody, ModalFooter, Input } from 'reactstrap';
import { DATE_FORMAT } from 'constants/date';
import TodoDataService from 'services/TodoDataService';
import DueDate from './DueDate';

const TodoItem = (props) => {
  const { message, dueDate, open, _id, onChange, onRemove } = props;
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(message);

  const onChangeVal = (event) => {
    setValue(event.target.value);
  };
  const toggle = () => setModal(!modal);
  return (
    <tr>
      <td width="30">
        <FormGroup check>
          <Label check>
            <input checked={!open} onChange={onChange} type="checkbox" />
            <span className="form-check-sign">
              <span className="check" />
            </span>
          </Label>
        </FormGroup>
      </td>
      <td>
        <p className="title">{value}</p>
      </td>
      <td width={100}>
        <DueDate date={dueDate} format={DATE_FORMAT} />
      </td>
      <td width={40} className="text-right">
        {typeof onRemove === 'function' ? (
          <>
            <Button color="link" id={`tooltip_remove_${_id}`} title="" type="button" onClick={onRemove}>
              <i className="tim-icons icon-trash-simple" />
            </Button>
            <Button color="default" onClick={toggle}>
              Edit
            </Button>
            <div>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                  <Input value={value} style={{ color: '#111' }} onChange={onChangeVal} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      TodoDataService.update(_id, { message: value });
                      setModal(!modal);
                    }}
                  >
                    Change name
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            <UncontrolledTooltip delay={0} target={`tooltip_remove_${_id}`} placement="right">
              Remove Task
            </UncontrolledTooltip>
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default TodoItem;
