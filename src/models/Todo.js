import Joi from 'joi';
import _ from 'lodash';

class Todo {
  schema = Joi.object().keys({
    _id: Joi.string(),
    message: Joi.string()
      .min(1)
      .max(100)
      .required(),
    open: Joi.boolean().required(),
    dueDate: Joi.date().timestamp(),
    categoryId: Joi.string(),
  });

  editableFields = ['categoryId', 'message', 'open', 'dueDate'];

  defaults = {
    // dueDate: Date.now(),
    dueDate: undefined,
    open: true,
  };

  init = (values) => {
    const todo = _.pick(values, this.editableFields);
    return _.defaults(todo, this.defaults);
  };

  close = (doc) => _.pick({ ...doc, open: false }, this.editableFields);

  reopen = (doc) => _.pick({ ...doc, open: true }, this.editableFields);

  changeMessage = (doc, message) => _.pick({ ...doc, message }, this.editableFields);

  validate = async (doc) => this.schema.validate(doc);
}

export default new Todo();
