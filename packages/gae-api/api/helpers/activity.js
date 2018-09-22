const admin = require("firebase-admin");
const db = admin.firestore();
const _ = require("lodash");

/**
 *
 * @param {string} workspaceId
 * @param {string} userId
 * @returns {number} number of events updated
 */
exports.updateEventsForWorkspaceId = async (workspaceId, userId) => {};
