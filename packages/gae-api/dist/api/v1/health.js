"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.health = void 0;

/**
 * Provides a health check endpoint that can be used
 * to validate that the server is up
 *
 * @param {*} req
 * @param {*} res
 */
const health = (req, res) => {
  res.send(200, 'running');
};

exports.health = health;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvdjEvaGVhbHRoLmpzIl0sIm5hbWVzIjpbImhlYWx0aCIsInJlcSIsInJlcyIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7OztBQU9PLE1BQU1BLE1BQU0sR0FBRyxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUNsQ0EsRUFBQUEsR0FBRyxDQUFDQyxJQUFKLENBQVMsR0FBVCxFQUFjLFNBQWQ7QUFDRCxDQUZNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQcm92aWRlcyBhIGhlYWx0aCBjaGVjayBlbmRwb2ludCB0aGF0IGNhbiBiZSB1c2VkXG4gKiB0byB2YWxpZGF0ZSB0aGF0IHRoZSBzZXJ2ZXIgaXMgdXBcbiAqXG4gKiBAcGFyYW0geyp9IHJlcVxuICogQHBhcmFtIHsqfSByZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGhlYWx0aCA9IChyZXEsIHJlcykgPT4ge1xuICByZXMuc2VuZCgyMDAsICdydW5uaW5nJyk7XG59O1xuIl19