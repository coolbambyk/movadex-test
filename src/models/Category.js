import Joi from 'joi';
import _ from 'lodash';

class Category {
  schema = Joi.object().keys({
    _id: Joi.string(),
    title: Joi.string()
      .min(1)
      .max(20)
      .required(),
    iconClass: Joi.string()
      .min(1)
      .max(20),
    readonly: Joi.boolean().default(false),
  });

  editableFields = ['title', 'iconClass'];

  defaults = {
    readonly: false,
  };

  init = (values) => {
    const doc = _.pick(values, ['_id', 'readonly', ...this.editableFields]);
    return _.defaults(doc, this.defaults);
  };

  setTitle = (doc, title) => _.pick({ ...doc, title: doc.readonly ? doc.title : title }, this.editableFields);

  setIconClass = (doc, iconClass) =>
    _.pick({ ...doc, iconClass: doc.readonly ? doc.iconClass : iconClass }, this.editableFields);

  validate = async (doc) => this.schema.validate(doc);
}

export default new Category();
