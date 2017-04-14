const UserBall = require('./user-ball')

class User {
  constructor(socket) {
    this.id = global.id++;
    this.socket = socket;
    this.ball = new UserBall(this.id);
    this.constructor.list.push(this);
  }

  emit(name, data) {
    this.socket.emit(name, data);
  }
}

User.list = [];

User.removeById = function (id) {
    let index = User.list.findIndex(user => {
        return user.id === id
    })
    if (!~index) {
        return
    }
    User.list.splice(index, 1)
    UserBall.remove(id)
};
User.removeArrById = function (ids) {
    User.list = User.list.filter(user => {
        return !~ids.findIndex(id => {
          return id === user.id
        })
    })
}

User.num = function () {
  return this.list.length;
};

User.get = function (id) {
  return this.list.find(user => user.id === id);
};

User.getAllBalls = function () {
  return this.list.map(user => user.ball);
};

User.update = function () {
  this.list.forEach(user => user.ball._update());
};

module.exports = User