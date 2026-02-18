class Ship {
  length = 1;
  #hit = 0;

  /**
   *
   * @param {Number} length how long is the ship?
   */
  constructor(length) {
    this.length = length;
  }

  hit() {
    this.#hit++;
  }

  isSunk() {
    return this.length === this.#hit;
  }
}

export default Ship;
