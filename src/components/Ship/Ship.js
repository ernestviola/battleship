class Ship {
  length = 1;
  id = null;
  color = null;
  #hit = 0;

  /**
   *
   * @param {Number} length how long is the ship?
   */
  constructor(length, color = "") {
    if (typeof length !== "number") throw Error("Ship length must be a number");
    this.length = length;
    this.color = color;
  }

  hit() {
    this.#hit++;
  }

  isSunk() {
    return this.length === this.#hit;
  }
}

export default Ship;
