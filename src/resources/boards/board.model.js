const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'title', colums = 'colums' } = {}) {
    this.id = id;
    this.title = title;
    this.colums = colums;
  }

  static toResponse(board) {
    const { id, title, colums } = board;
    return { id, title, colums };
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
