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
        if (!app.models["UserModel"].loginToken) {
            // If not authenticated, redirect to home page immediately and stop further execution, ensuring correct hash format
            window.location.hash = "#HomeController?index=";
            return;
        }

        // If authenticated, proceed with loading the staff view and updating the header
        super.loadView("app/view/staff/index.html", "app/src/css/pages/staff/index.css").then(() => {
            app.singletons["header"].setActiveMenuItem(4);
            app.singletons["header"].showUserAreaVisibility();
        });
    }

    logout() {
        app.models["UserModel"].clearLocalData();
        window.location.replace("#HomeController?index="); // Redirect to home page after sign out, ensuring correct hash format
    }
}