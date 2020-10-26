const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const MongoError = require('../resources/errors/MongoError');
const { MONGO_CONNECTION_STRING, MONGO_DATABASE } = require('../common/config');

/**
 *
 * @param tableName
 * @param find
 * @returns {Promise<null|any>}
 */
const getAllEntities = async (tableName, find = {}) => {

  try {
    // noinspection JSCheckFunctionSignatures
    const mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      const collection = mongoClient.db(MONGO_DATABASE).collection(tableName);

      let cursor = await collection.find(find);

      return await cursor.toArray();

    } catch (e) {
      return null;
    } finally {
      await mongoClient.close(false);
    }
  } catch (e) {
    throw new MongoError('MongoError: Unable to connect.');
  }

};

/**
 *
 * @param tableName
 * @param Data
 * @returns {Promise<string|null>}
 */
const saveEntity = async (tableName, Data) => {

  try {
    // noinspection JSCheckFunctionSignatures
    const mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      const collection = mongoClient.db(MONGO_DATABASE).collection(tableName);

      let insert = await collection.insertOne(Data);

      return await getEntityByMongoId(tableName, insert.insertedId.toString());
    } catch (e) {
      return null;
    } finally {
      await mongoClient.close(false);
    }
  } catch (e) {
    throw new MongoError('MongoError: Unable to connect.');
  }

};

/**
 *
 * @param tableName
 * @param entityId
 * @returns {Promise<null|*>}
 */
const getEntity = async (tableName, entityId) => {

  try {
    // noinspection JSCheckFunctionSignatures
    const mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      const collection = mongoClient.db(MONGO_DATABASE).collection(tableName);

      let cursor = await collection.findOne({ id: entityId });

      return await cursor;

    } catch (e) {
      return null;
    } finally {
      await mongoClient.close(false);
    }
  } catch (e) {
    throw new MongoError('MongoError: Unable to connect.');
  }

};

const getEntityByMongoId = async (tableName, entityId) => {

  try {
    // noinspection JSCheckFunctionSignatures
    const mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      const collection = mongoClient.db(MONGO_DATABASE).collection(tableName);

      let cursor = await collection.findOne({ _id: new mongodb.ObjectId(entityId) });

      return await cursor;

    } catch (e) {
      return null;
    } finally {
      await mongoClient.close(false);
    }
  } catch (e) {
    throw new MongoError('MongoError: Unable to connect.');
  }

};

/**
 *
 * @param tableName
 * @param id
 * @returns {Promise<null|*>}
 */
const removeEntity = async (tableName, id) => {

  try {
    // noinspection JSCheckFunctionSignatures
    const mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      const collection = mongoClient.db(MONGO_DATABASE).collection(tableName);

      let cursor = await collection.deleteOne({ id: id });

      return await cursor;

    } catch (e) {
      return null;
    } finally {
      await mongoClient.close(false);
    }
  } catch (e) {
    throw new MongoError('MongoError: Unable to connect.');
  }

};

const updateEntity = async (tableName, id, data) => {

  try {
    // noinspection JSCheckFunctionSignatures
    const mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      const collection = mongoClient.db(MONGO_DATABASE).collection(tableName);

      let cursor = await collection.updateOne({ id: id }, { $set: data });

      return await cursor;

    } catch (e) {
      return null;
    } finally {
      await mongoClient.close(false);
    }
  } catch (e) {
    throw new MongoError('MongoError: Unable to connect.');
  }

};

const dropDatabase = async () => {
  try {
    const mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {

      const drop = await mongoClient.db(MONGO_DATABASE).dropDatabase();
      return drop;

    } catch (e) {
      return null;
    } finally {
      await mongoClient.close(false);
    }

  } catch (e) {
    throw new MongoError('MongoError: Unable to connect.');
  }
};

module.exports = {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity,
  dropDatabase
};
