class UserModel extends Model {
  api = {
    login: userConfig.backendPath + "login",
    register: userConfig.backendPath + "register",
    // logout: config.backendPath + "auth/logout",
    // profile: config.backendPath + "auth/profile",
  };

  email = null;
  loginToken = null;
  name = null;

  constructor(name, email) {
    super();
    this.name = name || "";
    this.email = email || "";
    this.loginToken = null;
    this.restoreFromLocalData('UserModel');
  }

  clearLocalData() {
    this.name = null;
    this.email = null;
    this.loginToken = null;
    Model.clearLocalData();
  }

  // validateResponse(actual, expected) {
  //   function deepCompare(obj, template) {
  //     if (typeof template === "string") {
  //       return typeof obj === template;
  //     }

  //     if (typeof template === "object" && template !== null) {
  //       for (let key in template) {
  //         if (!(key in obj)) return false;
  //         if (!deepCompare(obj[key], template[key])) return false;
  //       }
  //       return true;
  //     }

  //     return false;
  //   }

  //   return deepCompare(actual, expected);
  // }

  toJson() {
    return {
      name: this.name,
      email: this.email,
      loginToken: this.loginToken,
    };
  }

  fromJson(data) {
    const userData = data?.user || data || {};
    this.name = userData.username || userData.name || this.name || "";
    this.email = userData.email || this.email || "";
    this.loginToken = data?.access_token || data?.loginToken || this.loginToken || null;
    return this;
  }

  isAuthenticated() {
    return !!this.loginToken;
  }
}

app.models["UserModel"] = new UserModel();

if (typeof window !== "undefined") {
  window.UserModel = UserModel;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { UserModel };
}

//Usage example
// const userModel = app.models["UserModel"];
// const expectedLoginSuccess = userModel.api.login.success;
// const expectedLoginError = userModel.api.login.error;

// // Simulated API response
// const apiResponse = {
//   token: "abc123",
//   user: {
//     name: "Carlos",
//     email: "carlos@example.com"
//   }
// };

// if (validateResponse(apiResponse, expectedLoginSuccess)) {
//   console.log("✅ Valid login response");
//   userModel.fromJson(apiResponse);
// } else {
//   console.warn("❌ Unexpected login response format");
// }
