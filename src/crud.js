var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


const crud = {
  insert: (name, address) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var newCompany = { name: name, address: address };
      dbo.collection("customers").insertOne(newCompany, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
  },

  query: (address) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var query = { address: address };
      dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
  },

  delete: (address) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myquery = { address: address };
      dbo.collection("customers").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
      });
    });
  },

  sort : () => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var mysort = { name : 1 };
      dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
  },

  unique: () => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection.createIndex( { "name": 1, "address" : 1 }, { unique: true } );
    });
  },

  limit: (number) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").find().limit(number).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
  },
};

// crud.insert("company0", "helloway 100");
// crud.query("highway 100");
// crud.delete("highway 100");
// crud.unique();
// crud.sort();

// The one below shows the record based on the time order, the first 10 inserted will show up
// crud.limit(10);

module.exports = crud;
