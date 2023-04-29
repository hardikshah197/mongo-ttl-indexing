# TTL Indexes
TTL indexes are special single-field indexes that MongoDB can use to automatically remove documents from a collection after a certain amount of time or at a specific clock time. Data expiration is useful for certain types of information like machine generated event data, logs, and session information that only need to persist in a database for a finite amount of time

## Create a TTL Index
To create a TTL index, use the `createIndex()` method on a field whose value is either a date or an array that contains date values, and specify the expireAfterSeconds option with the desired TTL value in seconds.

For example, to create a TTL index on the lastModifiedDate field of the eventlog collection, with a TTL value of 3600 seconds, use the following operation in 
__mongosh__:

```bash
db.eventlog.createIndex( { "created": 1 }, { expireAfterSeconds: 3600 } )
```
## Convert a non-TTL single-field Index into a TTL Index
Starting in MongoDB 5.1, you can add the `expireAfterSeconds` option to an existing single-field index. To change a non-TTL single-field index to a TTL index, use the __collMod__ database command:

```bash
db.runCommand({
  "collMod": <collName>,
  "index": {
    "keyPattern": <keyPattern>,
    "expireAfterSeconds": <number>
  }
});
```
## Behavior
### Expiration of Data
TTL indexes expire documents after the specified number of seconds has passed since the indexed field value; i.e. the expiration threshold is the indexed field value plus the specified number of __seconds__.

If the field is an array, and there are multiple date values in the index, MongoDB uses lowest (i.e. earliest) date value in the array to calculate the `expiration threshold`.

If the indexed field in a document is not a date or an array that holds one or more date values, the document will not expire.

If a document does not contain the indexed field, the document will not expire.

## Delete Operations
A background thread in mongod reads the values in the index and removes expired documents from the collection.

When the TTL thread is active, you will see delete operations in the output of `db.currentOp()` or in the data collected by the `database profiler`.

## Usage
This project contains normal backend applications developed using express framework & mongoose library.
You can run the project with the following command
```bash
node index.js
```

## Sampe env file:
```bash
URI=mongodb+srv://circleuser:${mongo_password}@cluster0.o7o8p.mongodb.net/${database_name}
COL=users
PORT=1234
```
Note: Replace mongo_password with your own password and database name with your own database name

## Author
[@hardikshah197](https://github.com/hardikshah197)
