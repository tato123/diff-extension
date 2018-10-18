import workspace from '../workspace';
import { Observable } from 'rxjs';

class DocRef {
  data() {
    return 'mock';
  }
  get id() {
    return '123';
  }
}

class DocChanges {
  forEach(cb) {
    const val = {
      doc: new DocRef(),
      type: 'added'
    };
    return cb(val);
  }
}

class MockQuerySnapshot {
  docChanges() {
    return new DocChanges();
  }
}

class MockDb {
  doc(val) {
    console.log('called doc', val);
    return this;
  }
  collection(val) {
    console.log('called collection', val);
    return this;
  }
  onSnapshot(cb) {
    cb(new MockQuerySnapshot());
  }
}

describe('actions', () => {
  let db;
  beforeEach(() => {
    db = new MockDb();
  });

  it('expect workspace$ to be observable', () => {
    expect(workspace(db).workspaces$()).toBeInstanceOf(Observable);
  });

  it('expect workspace$ fails if no id', done => {
    workspace(db)
      .workspaces$(null)
      .subscribe(
        () => {},

        err => {
          expect(err).toBe('uid cannot be null');
          done();
        },
        () => {}
      );
  });

  it('expect workspaceForId$ fails if no id', done => {
    workspace(db)
      .workspaceForId$(null)
      .subscribe(
        () => {},

        err => {
          expect(err).toBe('workspaceId cannot be null');
          done();
        },
        () => {}
      );
  });

  it('expect addCollaborators for no email', done => {
    workspace(db)
      .addCollaborators()
      .catch(error => {
        expect(error.message).not.toBeNull();
        done();
      });
  });

  it('expect addCollaborators to fail with no workspaceId', done => {
    workspace(db)
      .addCollaborators(['john@doe.com'])
      .catch(error => {
        expect(error.message).not.toBeNull();
        done();
      });
  });

  it('expect addSingleCollaborator for no email', done => {
    workspace(db)
      .addSingleCollaborator()
      .catch(error => {
        expect(error.message).not.toBeNull();
        done();
      });
  });

  it('expect addSingleCollaborator to fail with no workspaceId', done => {
    workspace(db)
      .addSingleCollaborator('john@doe.com')
      .catch(error => {
        expect(error.message).not.toBeNull();
        done();
      });
  });

  it('expect createWorkspace to fail with no name', done => {
    workspace(db)
      .createWorkspace()
      .catch(error => {
        expect(error.message).not.toBeNull();
        done();
      });
  });
});
