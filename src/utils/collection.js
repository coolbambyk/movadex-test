import shortid from 'shortid';
import db from './db';

const collections = new Set();

class Collection {
  privateFields = ['_id', '_createdAt'];

  constructor(name) {
    if (collections.has(name)) {
      throw new Error(`Collection with name ${name} already exists`);
    } else {
      collections.add(name);
    }

    this.name = name;
    db.defaults({ [name]: [] }).write();
  }

  getCollection = () => db.get(this.name);

  insert(doc) {
    const _id = doc._id || shortid.generate();
    const meta = {
      _id,
      _createdAt: Date.now(),
    };

    this.getCollection()
      .push({ ...doc, ...meta })
      .value();
    return _id;
  }

  findOne = (selector) =>
    this.getCollection()
      .find(selector)
      .value();

  find = (selector) =>
    this.getCollection()
      .filter(selector)
      .value();

  updateOne = (selector, modifier) =>
    this.getCollection()
      .find(selector)
      .assign(db._.omit(modifier, this.privateFields))
      .value();

  remove = (selector) =>
    this.getCollection()
      .remove(selector)
      .value();

  reset = db
    .set(this.name, [])
    .get(this.name)
    .value();

  persist = () => db.get(this.name).write();
}

export default Collection;
