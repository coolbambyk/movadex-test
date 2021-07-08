import { Todos as TodosCollection } from 'collections';
import EventEmitter from 'events';
import TodoModel from 'models/Todo';

// const _withPersistAfterAction = (callback) => async (...args) => {
//   await callback(...args);
//   await TodosCollection.persist();
// };
const deleteUndefinedValuesFromObject = (o) => {
  return Object.entries(o).reduce((acc, [key, value]) => {
    if (typeof value === 'undefined') return acc;
    return { ...acc, [key]: value };
  }, {});
};
class TodoDataService extends EventEmitter {
  collection = TodosCollection;

  getAll = (query = {}) => this.collection.find(deleteUndefinedValuesFromObject(query));

  getClose = (query = {}) => this.collection.find(deleteUndefinedValuesFromObject({ open: false, ...query }));

  getOpen = (query = {}) => this.collection.find(deleteUndefinedValuesFromObject({ open: true, ...query }));

  findOne = (selector) => this.collection.findOne(deleteUndefinedValuesFromObject(selector));

  update = async (_id, doc) => {
    await TodoModel.validate(doc);
    const updated = await this.collection.updateOne({ _id }, doc);
    await TodosCollection.persist();
    this.emit('update', updated);
  };

  remove = async (_id) => {
    await this.collection.remove({ _id });
    await TodosCollection.persist();
    this.emit('remove', { _id });
  };

  insert = async (values) => {
    const doc = TodoModel.init(values);
    await TodoModel.validate(doc);
    const _id = await this.collection.insert(doc);
    await TodosCollection.persist();
    this.emit('insert', { _id, ...doc });
    return { _id, ...doc };
  };

  listenChanges = (cb) => {
    const types = ['insert', 'remove', 'update'];
    types.forEach((eventType) => {
      this.on(eventType, cb);
    });
    return () => {
      types.forEach((eventType) => {
        this.off(eventType, cb);
      });
    };
  };
}

export default new TodoDataService();
