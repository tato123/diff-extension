const createWorkspace = params => {
  return `
    <h1>[Test Email]</h1>

    <h3>Welcome to Diff Workspaces!</h3>

    <p>You've just created your first workspace, "${params.name}"</p>
  `;
};

const inviteUserToWorkspace = params => {
  return `
    <h1>[Test Email]</h1>

    <h3>Diff - Invitation to collaborate !</h3>

    <p>${params.from} has invited you to join the workspace, "${
    params.name
  }"</p>
  `;
};

module.exports = {
  createWorkspace,
  inviteUserToWorkspace
};
