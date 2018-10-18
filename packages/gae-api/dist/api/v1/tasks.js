"use strict";

var emails = _interopRequireWildcard(require("../helpers/email"));

var _logging = _interopRequireDefault(require("../../logging"));

var _firestore = require("../../firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

exports.addEvent = async (req, res) => {
  const eventsRef = _firestore.db.collection('events');

  const workspaceRef = _firestore.db.collection('workspace');

  const activityRef = _firestore.db.collection('activity');

  const usersRef = _firestore.db.collection('users');

  const eventId = req.params.eventId.value;

  _logging.default.info('Received event id', eventId);

  if (!eventId) {
    return res.send(404);
  } // get the event type


  const eventDoc = await eventsRef.doc(eventId).get();
  const event = eventDoc.data();

  _logging.default.info('Checking event', event); // check if there is a workspace id


  if (!event.meta.workspaceId) {
    return res.send(404);
  } // 2. Get all the users associated with the workspace


  const workspaceDoc = await workspaceRef.doc(event.meta.workspaceId).get();
  const workspace = workspaceDoc.data();
  const userIds = Object.keys(workspace.users).filter(userId => userId !== event.meta.userId); // 3. Filter users who haven't view an event

  const unseenIdList = (await Promise.all(userIds.map(async userId => {
    const user = await activityRef.doc(userId).collection('seen').doc(eventDoc.id).get(); // if we have viewed it, there will be a record
    // we wnant the inverse, where seen records dont exists

    return user.exists ? null : userId;
  }))).filter(x => x != null); // 4. convert to an email list

  const emailList = await Promise.all(unseenIdList.map(async id => {
    const userDoc = await usersRef.doc(id).get();
    const user = userDoc.data();
    return user.email;
  })); // 5. Send these folks an email

  await Promise.all(emailList.map(async email => {
    _logging.default.info('Sending notification to email', email, 'for eventId', eventDoc.id);

    return emails.newComment(email, event);
  }));
  res.send(200, JSON.stringify(emailList));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvdjEvdGFza3MuanMiXSwibmFtZXMiOlsiZXhwb3J0cyIsImFkZEV2ZW50IiwicmVxIiwicmVzIiwiZXZlbnRzUmVmIiwiZGIiLCJjb2xsZWN0aW9uIiwid29ya3NwYWNlUmVmIiwiYWN0aXZpdHlSZWYiLCJ1c2Vyc1JlZiIsImV2ZW50SWQiLCJwYXJhbXMiLCJ2YWx1ZSIsImxvZ2dpbmciLCJpbmZvIiwic2VuZCIsImV2ZW50RG9jIiwiZG9jIiwiZ2V0IiwiZXZlbnQiLCJkYXRhIiwibWV0YSIsIndvcmtzcGFjZUlkIiwid29ya3NwYWNlRG9jIiwid29ya3NwYWNlIiwidXNlcklkcyIsIk9iamVjdCIsImtleXMiLCJ1c2VycyIsImZpbHRlciIsInVzZXJJZCIsInVuc2VlbklkTGlzdCIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJ1c2VyIiwiaWQiLCJleGlzdHMiLCJ4IiwiZW1haWxMaXN0IiwidXNlckRvYyIsImVtYWlsIiwiZW1haWxzIiwibmV3Q29tbWVudCIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPLENBQUNDLFFBQVIsR0FBbUIsT0FBT0MsR0FBUCxFQUFZQyxHQUFaLEtBQW9CO0FBQ3JDLFFBQU1DLFNBQVMsR0FBR0MsY0FBR0MsVUFBSCxDQUFjLFFBQWQsQ0FBbEI7O0FBQ0EsUUFBTUMsWUFBWSxHQUFHRixjQUFHQyxVQUFILENBQWMsV0FBZCxDQUFyQjs7QUFDQSxRQUFNRSxXQUFXLEdBQUdILGNBQUdDLFVBQUgsQ0FBYyxVQUFkLENBQXBCOztBQUNBLFFBQU1HLFFBQVEsR0FBR0osY0FBR0MsVUFBSCxDQUFjLE9BQWQsQ0FBakI7O0FBRUEsUUFBTUksT0FBTyxHQUFHUixHQUFHLENBQUNTLE1BQUosQ0FBV0QsT0FBWCxDQUFtQkUsS0FBbkM7O0FBQ0FDLG1CQUFRQyxJQUFSLENBQWEsbUJBQWIsRUFBa0NKLE9BQWxDOztBQUNBLE1BQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1osV0FBT1AsR0FBRyxDQUFDWSxJQUFKLENBQVMsR0FBVCxDQUFQO0FBQ0QsR0FWb0MsQ0FZckM7OztBQUNBLFFBQU1DLFFBQVEsR0FBRyxNQUFNWixTQUFTLENBQUNhLEdBQVYsQ0FBY1AsT0FBZCxFQUF1QlEsR0FBdkIsRUFBdkI7QUFDQSxRQUFNQyxLQUFLLEdBQUdILFFBQVEsQ0FBQ0ksSUFBVCxFQUFkOztBQUNBUCxtQkFBUUMsSUFBUixDQUFhLGdCQUFiLEVBQStCSyxLQUEvQixFQWZxQyxDQWlCckM7OztBQUNBLE1BQUksQ0FBQ0EsS0FBSyxDQUFDRSxJQUFOLENBQVdDLFdBQWhCLEVBQTZCO0FBQzNCLFdBQU9uQixHQUFHLENBQUNZLElBQUosQ0FBUyxHQUFULENBQVA7QUFDRCxHQXBCb0MsQ0FzQnJDOzs7QUFDQSxRQUFNUSxZQUFZLEdBQUcsTUFBTWhCLFlBQVksQ0FBQ1UsR0FBYixDQUFpQkUsS0FBSyxDQUFDRSxJQUFOLENBQVdDLFdBQTVCLEVBQXlDSixHQUF6QyxFQUEzQjtBQUNBLFFBQU1NLFNBQVMsR0FBR0QsWUFBWSxDQUFDSCxJQUFiLEVBQWxCO0FBQ0EsUUFBTUssT0FBTyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWUgsU0FBUyxDQUFDSSxLQUF0QixFQUE2QkMsTUFBN0IsQ0FDZEMsTUFBTSxJQUFJQSxNQUFNLEtBQUtYLEtBQUssQ0FBQ0UsSUFBTixDQUFXUyxNQURsQixDQUFoQixDQXpCcUMsQ0E2QnJDOztBQUNBLFFBQU1DLFlBQVksR0FBRyxDQUFDLE1BQU1DLE9BQU8sQ0FBQ0MsR0FBUixDQUMxQlIsT0FBTyxDQUFDUyxHQUFSLENBQVksTUFBTUosTUFBTixJQUFnQjtBQUMxQixVQUFNSyxJQUFJLEdBQUcsTUFBTTNCLFdBQVcsQ0FDM0JTLEdBRGdCLENBQ1phLE1BRFksRUFFaEJ4QixVQUZnQixDQUVMLE1BRkssRUFHaEJXLEdBSGdCLENBR1pELFFBQVEsQ0FBQ29CLEVBSEcsRUFJaEJsQixHQUpnQixFQUFuQixDQUQwQixDQU8xQjtBQUNBOztBQUNBLFdBQU9pQixJQUFJLENBQUNFLE1BQUwsR0FBYyxJQUFkLEdBQXFCUCxNQUE1QjtBQUNELEdBVkQsQ0FEMEIsQ0FBUCxFQVlsQkQsTUFaa0IsQ0FZWFMsQ0FBQyxJQUFJQSxDQUFDLElBQUksSUFaQyxDQUFyQixDQTlCcUMsQ0E0Q3JDOztBQUNBLFFBQU1DLFNBQVMsR0FBRyxNQUFNUCxPQUFPLENBQUNDLEdBQVIsQ0FDdEJGLFlBQVksQ0FBQ0csR0FBYixDQUFpQixNQUFNRSxFQUFOLElBQVk7QUFDM0IsVUFBTUksT0FBTyxHQUFHLE1BQU0vQixRQUFRLENBQUNRLEdBQVQsQ0FBYW1CLEVBQWIsRUFBaUJsQixHQUFqQixFQUF0QjtBQUNBLFVBQU1pQixJQUFJLEdBQUdLLE9BQU8sQ0FBQ3BCLElBQVIsRUFBYjtBQUNBLFdBQU9lLElBQUksQ0FBQ00sS0FBWjtBQUNELEdBSkQsQ0FEc0IsQ0FBeEIsQ0E3Q3FDLENBcURyQzs7QUFDQSxRQUFNVCxPQUFPLENBQUNDLEdBQVIsQ0FDSk0sU0FBUyxDQUFDTCxHQUFWLENBQWMsTUFBTU8sS0FBTixJQUFlO0FBQzNCNUIscUJBQVFDLElBQVIsQ0FDRSwrQkFERixFQUVFMkIsS0FGRixFQUdFLGFBSEYsRUFJRXpCLFFBQVEsQ0FBQ29CLEVBSlg7O0FBTUEsV0FBT00sTUFBTSxDQUFDQyxVQUFQLENBQWtCRixLQUFsQixFQUF5QnRCLEtBQXpCLENBQVA7QUFDRCxHQVJELENBREksQ0FBTjtBQVlBaEIsRUFBQUEsR0FBRyxDQUFDWSxJQUFKLENBQVMsR0FBVCxFQUFjNkIsSUFBSSxDQUFDQyxTQUFMLENBQWVOLFNBQWYsQ0FBZDtBQUNELENBbkVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZW1haWxzIGZyb20gJy4uL2hlbHBlcnMvZW1haWwnO1xuaW1wb3J0IGxvZ2dpbmcgZnJvbSAnLi4vLi4vbG9nZ2luZyc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uL2ZpcmVzdG9yZSc7XG5cbmV4cG9ydHMuYWRkRXZlbnQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgZXZlbnRzUmVmID0gZGIuY29sbGVjdGlvbignZXZlbnRzJyk7XG4gIGNvbnN0IHdvcmtzcGFjZVJlZiA9IGRiLmNvbGxlY3Rpb24oJ3dvcmtzcGFjZScpO1xuICBjb25zdCBhY3Rpdml0eVJlZiA9IGRiLmNvbGxlY3Rpb24oJ2FjdGl2aXR5Jyk7XG4gIGNvbnN0IHVzZXJzUmVmID0gZGIuY29sbGVjdGlvbigndXNlcnMnKTtcblxuICBjb25zdCBldmVudElkID0gcmVxLnBhcmFtcy5ldmVudElkLnZhbHVlO1xuICBsb2dnaW5nLmluZm8oJ1JlY2VpdmVkIGV2ZW50IGlkJywgZXZlbnRJZCk7XG4gIGlmICghZXZlbnRJZCkge1xuICAgIHJldHVybiByZXMuc2VuZCg0MDQpO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBldmVudCB0eXBlXG4gIGNvbnN0IGV2ZW50RG9jID0gYXdhaXQgZXZlbnRzUmVmLmRvYyhldmVudElkKS5nZXQoKTtcbiAgY29uc3QgZXZlbnQgPSBldmVudERvYy5kYXRhKCk7XG4gIGxvZ2dpbmcuaW5mbygnQ2hlY2tpbmcgZXZlbnQnLCBldmVudCk7XG5cbiAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSB3b3Jrc3BhY2UgaWRcbiAgaWYgKCFldmVudC5tZXRhLndvcmtzcGFjZUlkKSB7XG4gICAgcmV0dXJuIHJlcy5zZW5kKDQwNCk7XG4gIH1cblxuICAvLyAyLiBHZXQgYWxsIHRoZSB1c2VycyBhc3NvY2lhdGVkIHdpdGggdGhlIHdvcmtzcGFjZVxuICBjb25zdCB3b3Jrc3BhY2VEb2MgPSBhd2FpdCB3b3Jrc3BhY2VSZWYuZG9jKGV2ZW50Lm1ldGEud29ya3NwYWNlSWQpLmdldCgpO1xuICBjb25zdCB3b3Jrc3BhY2UgPSB3b3Jrc3BhY2VEb2MuZGF0YSgpO1xuICBjb25zdCB1c2VySWRzID0gT2JqZWN0LmtleXMod29ya3NwYWNlLnVzZXJzKS5maWx0ZXIoXG4gICAgdXNlcklkID0+IHVzZXJJZCAhPT0gZXZlbnQubWV0YS51c2VySWRcbiAgKTtcblxuICAvLyAzLiBGaWx0ZXIgdXNlcnMgd2hvIGhhdmVuJ3QgdmlldyBhbiBldmVudFxuICBjb25zdCB1bnNlZW5JZExpc3QgPSAoYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgdXNlcklkcy5tYXAoYXN5bmMgdXNlcklkID0+IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhY3Rpdml0eVJlZlxuICAgICAgICAuZG9jKHVzZXJJZClcbiAgICAgICAgLmNvbGxlY3Rpb24oJ3NlZW4nKVxuICAgICAgICAuZG9jKGV2ZW50RG9jLmlkKVxuICAgICAgICAuZ2V0KCk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgdmlld2VkIGl0LCB0aGVyZSB3aWxsIGJlIGEgcmVjb3JkXG4gICAgICAvLyB3ZSB3bmFudCB0aGUgaW52ZXJzZSwgd2hlcmUgc2VlbiByZWNvcmRzIGRvbnQgZXhpc3RzXG4gICAgICByZXR1cm4gdXNlci5leGlzdHMgPyBudWxsIDogdXNlcklkO1xuICAgIH0pXG4gICkpLmZpbHRlcih4ID0+IHggIT0gbnVsbCk7XG5cbiAgLy8gNC4gY29udmVydCB0byBhbiBlbWFpbCBsaXN0XG4gIGNvbnN0IGVtYWlsTGlzdCA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHVuc2VlbklkTGlzdC5tYXAoYXN5bmMgaWQgPT4ge1xuICAgICAgY29uc3QgdXNlckRvYyA9IGF3YWl0IHVzZXJzUmVmLmRvYyhpZCkuZ2V0KCk7XG4gICAgICBjb25zdCB1c2VyID0gdXNlckRvYy5kYXRhKCk7XG4gICAgICByZXR1cm4gdXNlci5lbWFpbDtcbiAgICB9KVxuICApO1xuXG4gIC8vIDUuIFNlbmQgdGhlc2UgZm9sa3MgYW4gZW1haWxcbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgZW1haWxMaXN0Lm1hcChhc3luYyBlbWFpbCA9PiB7XG4gICAgICBsb2dnaW5nLmluZm8oXG4gICAgICAgICdTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBlbWFpbCcsXG4gICAgICAgIGVtYWlsLFxuICAgICAgICAnZm9yIGV2ZW50SWQnLFxuICAgICAgICBldmVudERvYy5pZFxuICAgICAgKTtcbiAgICAgIHJldHVybiBlbWFpbHMubmV3Q29tbWVudChlbWFpbCwgZXZlbnQpO1xuICAgIH0pXG4gICk7XG5cbiAgcmVzLnNlbmQoMjAwLCBKU09OLnN0cmluZ2lmeShlbWFpbExpc3QpKTtcbn07XG4iXX0=