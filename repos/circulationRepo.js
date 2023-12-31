const { MongoClient, ObjectId } = require("mongodb")
const dotenv = require("dotenv")

function circulationRepo() {
  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)
        results = await db.collection("newspapers").insertMany(data)
        resolve(results)
        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  function get(query, limit) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)
        let items = db.collection("newspapers").find(query)
        if (limit > 0) {
          items = items.limit(limit)
        }
        resolve(await items.toArray())
        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  function getById(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)
        const item = await db
          .collection("newspapers")
          .findOne({ _id: new ObjectId(id) })
        resolve(item)
        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  function add(item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)
        const addedItem = await db.collection("newspapers").insertOne(item)
        resolve(addedItem.insertedId)
        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  function update(id, newItem) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)
        const updatedItem = await db
          .collection("newspapers")
          .findOneAndReplace({ _id: new ObjectId(id) }, newItem, {
            returnDocument: "after",
          })
        resolve(updatedItem.value)
        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  function remove(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)
        const removed = await db
          .collection("newspapers")
          .deleteOne({ _id: new ObjectId(id) })
        resolve(removed.deletedCount === 1)
        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  return { loadData, get, getById, add, update, remove }
}

module.exports = circulationRepo()
