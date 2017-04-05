let mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  name: String,
  email: String,
  tel: String,
  type: String
});

let user = mongoose.model('user', userSchema);

module.exports = user;

module.exports.getListOfUsers = () => {
  return new Promise((resolve, reject) => {
    user.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getNListOfUsers = (root, {num}) => {
  return new Promise((resolve, reject) => {
    user.find({}).limit(num).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};


module.exports.getUserById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    user.findOne({
      id: id
    }).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getUserByName = (root, {name}) => {
  return new Promise((resolve, reject) => {
    user.findOne({
      name: name
    }).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getUserByPosition = (root, {id}) => {
  return new Promise((resolve, reject) => {
    user.find({}).exec((err, res) => {
      console.log(res)
      err ? reject(err) : resolve(res[id]);
    });
  });
};

module.exports.addUser = (root, {name, email, tel}) => {
  var newUser = new user({name:name, email:email, tel:tel});

  return new Promise((resolve, reject) => {
    newUser.save((err, res) => {
      err ? reject(err): resolve(res);
    });
  });
}

module.exports.updateUser = (root, {id, name, email, tel}) => {
  var updateFields = {}
  if(name) updateFields.name = name
  if(email) updateFields.email = email
  if(tel) updateFields.tel = tel
  return new Promise((resolve, reject) => {
    user.findOneAndUpdate(
      { id: id },
      { $set: updateFields },
      { returnNewDocument: true, new: true}
    ).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}
