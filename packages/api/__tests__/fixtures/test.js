module.exports = (accountId, userId) => {
  return [
    {
      comment:
        "Looking good! One small change.  The border radius should be 3px. The  JIRA story is linked.",
      url: "https://storage.googleapis.com/diff-tester/index.html",
      selector: ".button.skeleton.round",
      type: "comment",
      meta: {
        accountId,
        userId,
        created: Date.now()
      }
    },
    {
      diff: {
        from: "<div>a</div>",
        to: "<div>Hello</div>"
      },
      diffType: "html",
      url: "https://storage.googleapis.com/diff-tester/index.html",
      selector: ".button.skeleton.round",
      type: "diff",
      meta: {
        accountId,
        userId,
        created: Date.now()
      }
    },
    {
      comment: "hey Friend",
      url: "https://storage.googleapis.com/diff-tester/index.html",
      selector: ".h1.skeleton.round",
      ts: null,
      type: "comment",
      meta: {
        accountId,
        userId,
        created: Date.now()
      }
    }
  ];
};
