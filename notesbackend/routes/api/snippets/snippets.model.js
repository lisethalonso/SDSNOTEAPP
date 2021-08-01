const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectId; //
let db;
let notasCollection;

(async function(){
    try{
      if (!notasCollection) {
        db = await MongoDB.getDB();
        notasCollection = db.collection("notas");
        if(process.env.ENSURE_INDEX == 1){
          // Vamos a asegurarnos de que exista el indice
        }
      }
    }catch(ex){
      console.log(ex);
      process.exit(1);
    }
})(); //Autollamado de una funcion anonima

module.exports.getAll = async ()=>{
    try {
      let docsCursor = notasCollection.find({});
      let rows = await docsCursor.toArray()
      return rows;
    } catch(ex){
      console.log(ex);
      throw(ex);
    }
}

module.exports.getAllFacet = async (page, itemsPerPage) => {
  try {
    let options = {
      skip: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      projection: {name:1, sales:1, keywords:1},
      sort:[["name", 1]]
    };

    let docsCursor = notasCollection.find({}, options);
    let rownum = await docsCursor.count();
    let rows = await docsCursor.toArray()
    return {rownum, rows};
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getById = async (id)=>{
  try {
    const _id = new ObjectId(id);
    const filter = {_id: _id};
    let row = await notasCollection.findOne(filter);
    return row;
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.getBySales = async (sales)=>{
  try {
    const filter = {sales:sales};
    let cursor = notasCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.getBySalesWithOperator = async (sales, operator) => {
  try {
    let mongoOperator = {};
    switch(operator){
      case "gt":
        mongoOperator["$gt"] = sales;
       break;
      case "lt":
        mongoOperator["$lt"] = sales;
        break;
      case "gte":
        mongoOperator["$gte"] = sales;
        break;
      case "lte":
        mongoOperator["$lte"] = sales;
        break;
      default:
        mongoOperator = sales;
        break;
    }
    const filter = { sales: mongoOperator };
    let cursor = notasCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getBySalesRange = async (lowerLimit, upperLimit, includeExtremes) => {
  try {
    const range = (includeExtremes) ? 
        {"$gte":lowerLimit, "$lte":upperLimit} :
        {"$gt":lowerLimit, "$lt":upperLimit}
    ;
    const filter = { sales: range };
    let cursor = notasCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.addNota = async (titulo, descripcion, palabrasClave, user)=>{
  const fecha = new Date().getTime();
    try{
      let newNota = {
        titulo: titulo,
        descripcion: descripcion,
        palabrasClave: palabrasClave.split(","),
        fechaCreacion: fecha,
        user:user
      };
      let result = await notasCollection.insertOne(newNota);
      return result.ops;
    }catch(ex){
      console.log(ex);
      throw(ex);
    }
  
}

module.exports.addAny = async (document) => {
  try {
    let result = await notasCollection.insertOne(document);
    return result.ops;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.addKeyword = async (id, keyword) =>{
  try {
    const _id = new ObjectId(id);
    const filter = {"_id": _id};
    const updateObj = {"$push":{"keywords": keyword}};
    let result = await notasCollection.updateOne(filter, updateObj);
    return result;
  } catch(ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.addKeywords = async (id, keywords) => {
  try {
    const _id = new ObjectId(id);
    const filter = { "_id": _id };
    const updateObj = { "$set": { "keywords": keywords.split(",") } };
    let result = await notasCollection.updateOne(filter, updateObj);
    return result;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getByKeyword = async (keyword) => {
  try {
    const filter = { "keywords": keyword };
    let cursor = notasCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getByCommentUser = async (email)=>{
  try{
    const filter = {"comments.email": email};
    let cursor = notasCollection.find(filter, { projection:{name:1, sales:1} });
    let rows = await cursor.toArray();
    return rows;
  }catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.deleteById = async (id) => {
  try {
    const _id = new ObjectId(id);
    const filter = { _id: _id };
    let row = await notasCollection.deleteOne(filter);
    return row;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getSalesFreq = async () => {
  try {
  let pipeline = [];
  // Agrupo por el valor de sales y suma 1 por cada documento
  pipeline.push(
    {
      "$group": 
        {
          _id: "$sales",
          salesAmount: {
              $sum: 1
          }
      }
    });
   // Ordena los documentos resultantes del $group de forma descendiente 
   // por el conteo
   pipeline.push({
      "$sort": {
        salesAmount: -1
      }
    });
    //Limitamos el numero de documentos despues del sort
    pipeline.push(
      {"$limit": 5}
    );

    let cursor = notasCollection.aggregate(pipeline);
    let rows = await cursor.toArray();
    return rows;
  } catch(ex){
    console.log(ex);
    throw (ex);
  }
}

module.exports.getCommentByDate = async ()=>{
  try {
    let pipeline = [{
      $unwind: {
        path: "$comments",
        includeArrayIndex: 'comment_index',
        preserveNullAndEmptyArrays: false
      }
    }, {
      $group: {
        _id: { $dateToString: { date: { $toDate: "$comments.date" }, format: "%Y-%m-%d %H:00:%S", timezone: "-0600" } },
        frecuency: {
          "$sum": 1
        }
      }
    }];
    let cursor = notasCollection.aggregate(pipeline);
    let rows = await cursor.toArray();
    return rows;
  } catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.getSnippetsByUser = async (user)=>{
  try {
    let pipeline = [{
      "$group": {
        _id: '$user', 
        frecuency: {
          '$sum': 1
        }
      }
    },{
      "$match": {
        _id: user
      }
    }];
    let cursor = notasCollection.aggregate(pipeline);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.getTop5KeywordsByUser = async (user)=>{
  try {
    let pipeline = [{
      '$match': {
        'user': user
      }
    },{
      '$unwind': {
        'path': '$keywords', 
        'includeArrayIndex': 'keywords_index', 
        'preserveNullAndEmptyArrays': false
      }
    },{
      '$group': {
        '_id': '$keywords', 
        'total': {
          '$sum': 1
        }
      }
    },{
      '$sort': {
        'total': -1
      }
    },{
      '$limit': 5
    }];
    let cursor = notasCollection.aggregate(pipeline);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.getTotalSalesByUser = async (user)=>{
  try {

    let pipeline = [
      {
        "$match":{
          'user': user
        }
      },
      {
        "$group": 
        {
          _id:"$user", 
          conteo:{"$sum":"$sales"}
        }
      }
    ];
    let cursor = notasCollection.aggregate(pipeline);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

//   _id: ObjectID("afasdasdccasb102938")

// Operadores en Mongodb son distintos

/*
Select * from snippets where sales = 3;
db.snippets.find({sales:3});
select * from snippets where sales > 50; greater than 
select * from snippets where sales < 50; less than
select * from snippets where sales >= 80; greater than or equal
select * from snippets where sales <= 40;
db.snippets.find({sales: {$gt : 50} })
db.snippets.find({sales: {$lt : 50} })
db.snippets.find({sales: {$gte : 80} })
db.snippets.find({sales: {$lte : 40} })
select * from snippets where sales > 20 and sales < 30;
db.snippets.find({sales : {$gt:20, $lt:30} });
MySQL
select count(*) from snippets; 
Pagin 1 50
select * from snippets limit (1, 50);
select * from snippets limit (51, 100);
select * from snippets order by sales, name;
0 name , 1 sales
0 sales, 1 name
json (no determina orden)
{name:1, sales:1} === {sales:1, name:1}
["names", "sales"] !== ["sales", "names"]
0, 1
*/