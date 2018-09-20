import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cloudTasks from "@google-cloud/tasks";

admin.initializeApp();

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

interface EventContext extends functions.EventContext {
  params: {
    eventId: string;
  };
}

interface Task {
  appEngineHttpRequest: {
    httpMethod: string;
    relativeUri: string;
    appEngineRouting: {
      service: string;
    };
  };
  scheduleTime: {
    seconds: number;
  };
}

const project = "diff-204716";
const queue = "notifications-addComment";
const location = "us-central1";
const options = { inSeconds: 20 };

exports.onCreateEvent = functions.firestore
  .document("events/{eventId}")
  .onCreate((snap, context) => {
    const event = snap.data();

    if (event.type === "comment" && "workspaceId" in event.meta) {
      const client = new cloudTasks.CloudTasksClient();

      // Construct the fully qualified queue name.
      const parent = client.queuePath(project, location, queue);

      const task: Task = {
        appEngineHttpRequest: {
          httpMethod: "POST",
          relativeUri: `/notifications/event/add/${context.params.eventId}`,
          appEngineRouting: {
            service: "api"
          }
        },
        scheduleTime: {
          seconds: options.inSeconds + Date.now() / 1000
        }
      };

      const request = {
        parent: parent,
        task: task
      };

      console.log("Sending task %j", task);
      return client
        .createTask(request)
        .then(response => {
          const taskName = response[0].name;
          console.log(`Created task ${taskName}`);
        })
        .catch(err => {
          console.error(`Error in createTask: ${err.message || err}`);
        });
    }

    return Promise.resolve();
  });
