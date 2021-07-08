import { Categories as CategoriesCollection } from 'collections';
import EventEmitter from 'events';
import CategoryModel from 'models/Category';

class CategoryService extends EventEmitter {
  collection = CategoriesCollection;

  getAll = () => this.collection.find();

  findOne = (selector) => this.collection.findOne(selector);

  update = async (_id, doc) => {
    const entry = this.findOne({ _id });
    if (entry.readonly) return;

    await CategoryModel.validate(doc);
    const updated = await this.collection.updateOne({ _id }, doc);
    await this.collection.persist();
    this.emit('update', updated);
  };

  remove = async (_id) => {
    await this.collection.remove({ _id });
    await this.collection.persist();
    this.emit('remove', { _id });
  };

  insert = async (values) => {
    const doc = await CategoryModel.init(values);
    await CategoryModel.validate(doc);
    const _id = await this.collection.insert(doc);
    await this.collection.persist();
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

export default new CategoryService();
