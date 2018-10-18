import * as emails from '../../email/email';
import logging from '../../logging';
import { db } from '../../firestore';

exports.addEvent = async (req, res) => {
  const eventsRef = db.collection('events');
  const workspaceRef = db.collection('workspace');
  const activityRef = db.collection('activity');
  const usersRef = db.collection('users');

  const eventId = req.params.eventId.value;
  logging.info('Received event id', eventId);
  if (!eventId) {
    return res.send(404);
  }

  // get the event type
  const eventDoc = await eventsRef.doc(eventId).get();
  const event = eventDoc.data();
  logging.info('Checking event', event);

  // check if there is a workspace id
  if (!event.meta.workspaceId) {
    return res.send(404);
  }

  // 2. Get all the users associated with the workspace
  const workspaceDoc = await workspaceRef.doc(event.meta.workspaceId).get();
  const workspace = workspaceDoc.data();
  const userIds = Object.keys(workspace.users).filter(
    userId => userId !== event.meta.userId
  );

  // 3. Filter users who haven't view an event
  const unseenIdList = (await Promise.all(
    userIds.map(async userId => {
      const user = await activityRef
        .doc(userId)
        .collection('seen')
        .doc(eventDoc.id)
        .get();

      // if we have viewed it, there will be a record
      // we wnant the inverse, where seen records dont exists
      return user.exists ? null : userId;
    })
  )).filter(x => x != null);

  // 4. convert to an email list
  const emailList = await Promise.all(
    unseenIdList.map(async id => {
      const userDoc = await usersRef.doc(id).get();
      const user = userDoc.data();
      return user.email;
    })
  );

  // 5. Send these folks an email
  await Promise.all(
    emailList.map(async email => {
      logging.info(
        'Sending notification to email',
        email,
        'for eventId',
        eventDoc.id
      );
      return emails.newComment(email, event);
    })
  );

  res.send(200, JSON.stringify(emailList));
};
