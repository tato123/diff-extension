import activity from "../activity";
import { Observable } from "rxjs";

class DocRef {
  data() {
    return "mock";
  }
  get id() {
    return "123";
  }
}

class DocChanges {
  forEach(cb) {
    const val = {
      doc: new DocRef(),
      type: "added"
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
    console.log("called doc", val);
    return this;
  }
  collection(val) {
    console.log("called collection", val);
    return this;
  }
  onSnapshot(cb) {
    cb(new MockQuerySnapshot());
  }
}

describe("actions", () => {
  let db;
  beforeEach(() => {
    db = new MockDb();
  });
  it("userActivity to be observable", () => {
    expect(activity(db).userActivity$()).toBeInstanceOf(Observable);
  });

  it("userActivity returns doc changes", done => {
    activity(db)
      .userActivity$("Abc")
      .subscribe(val => {
        expect(val).toEqual({
          data: "mock",
          type: "added",
          id: "123"
        });
        done();
      });
  });
});
