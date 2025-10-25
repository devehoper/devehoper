export default class AuthController extends Controller {

    constructor() {
        super();
        let _this = this;
        Controller.loadModel("UserModel").then(() => {
            _this.userModel = app.models["UserModel"];
        });
    }

    /**
     * This controller doesn't load a main view, it only shows a modal.
     * The index() method is required by the framework but can be empty.
     */
    index() {
        super.loadView("app/view/staff/index.html", "app/src/css/pages/staff/index.css").then(() => {
            if(!app.models["UserModel"].isAuthenticated()) {
                window.location.hash = "#HomeController?index"; // Redirect to user page
            }
        });
    }
}