var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Azure = {
    dbName: 'wlytech',
    key: 'kSKBOa6W2YeIY15ADXdd66JvizD2TkRi1Gz2KRDdriuZArrWOTVBLSG95qqfLhbhOxfZU44sAualQa0Hh7uHcg==',
    port: 10255
};

const MongoDB = {
  dbName: 'wlysses',
  key: 'bass'
};

const AzureUri = `mongodb://${Azure.dbName}:${Azure.key}@${Azure.dbName}.documents.azure.com:${Azure.port}/test?ssl=true&replicaSet=globaldb`

const MongoDBUri = `mongodb+srv://${MongoDB.dbName}:${MongoDB.key}@cluster0-tslmr.azure.mongodb.net/test?retryWrites=true&w=majority`;

const Uri = MongoDBUri;

function connect() {
   return mongoose.connect(Uri, { useNewUrlParser: true })
   .then(() => console.log('Connection to MongoDataBase successful'))
   .catch((err) => console.error(err));
}

module.exports = {
    connect,
    mongoose
};