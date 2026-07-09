const { JSDOM } = require("jsdom");

describe("Model Class", () => {
  let Model;

  beforeAll(() => {
    global.localStorage = {
      store: {},
      setItem(key, value) {
        this.store[key] = value;
      },
      getItem(key) {
        return this.store[key] || null;
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      },
    };

    global.userConfig = { localStorage: "devehoper", backendPath: "" };
    global.config = { localStorage: "devehoper" };
    global.app = { models: {} };

    // Load the Model class
    Model = require("../app/kernel/Model.js").Model;
  });

  beforeEach(() => {
    localStorage.clear();
    global.app.models = {};
  });

  test("should set and get local data", () => {
    const data = { key: "value" };
    Model.setLocalData(data);
    const result = Model.getLocalData();
    expect(result).toEqual(data);
  });

  test("should clear local data", () => {
    const data = { key: "value" };
    Model.setLocalData(data);
    Model.clearLocalData();
    const result = Model.getLocalData();
    expect(result).toEqual({});
  });

  test("should validate required fields", () => {
    const formData = { username: "" };
    const rules = { username: { required: true } };
    const errors = new Model().validateData(formData, rules);
    expect(errors.username).toBe("username is required");
  });

  test("should validate email format", () => {
    const formData = { email: "invalid-email" };
    const rules = { email: { email: true } };
    const errors = new Model().validateData(formData, rules);
    expect(errors.email).toBe("Invalid email format");
  });

  test("should restore user model data from local storage", () => {
    Model.setLocalData({ name: "Alice", email: "alice@example.com", loginToken: "token-123" });
    delete require.cache[require.resolve("../app/model/UserModel.js")];
    require("../app/model/UserModel.js");

    const userModel = app.models["UserModel"];
    expect(userModel.name).toBe("Alice");
    expect(userModel.email).toBe("alice@example.com");
    expect(userModel.loginToken).toBe("token-123");
  });
});
