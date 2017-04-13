const Ball = require('./Ball');

let guid = 0;

class User {
  constructor(socket) {
    this.id = guid++;
    this.socket = socket;
    this.ball = new Ball(this.id);
    this.constructor._list.push(this);
  }

  emit(name, data) {
    this.socket.emit(name, data);
  }
}

User._list = [];

User.remove = function (id) {
  this._list = this._list.filter((user) => user.id !== id);
};

User.num = function () {
  return this._list.length;
};

User.get = function (id) {
  return this._list.fliter(user => user.id === id)[0]; 
};

User.getAllBalls = function () {
  return this._list.map(user => user.ball);
};

User.update = function () {
  this._list.forEach(user => user.ball._update());
};
