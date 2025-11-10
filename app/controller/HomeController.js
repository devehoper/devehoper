export default class HomeController extends Controller {
    constructor() {
        super();
    }

    index() {
        super.loadView("app/view/home/content").then( () => {
            typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(0) : null;
        });
    }

    about() {
        super.loadView("app/view/home/about").then( () => {
            typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(1): null;
        });
    }

    contact() {
        super.loadView("app/view/home/contact").then( () => {
            typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(3): null;
        });
    }

    services() {
        super.loadView("app/view/home/services", "app/src/css/pages/services.css", "app/src/js/home/services.js").then( () => {
            typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(2): null;
            // Start the check when the script executes
            
        });
    }

    blog() {
        super.loadView("app/view/home/blog").then( () => {
            typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(4): null;
        });
    }

    faq() {
        super.loadView("app/view/home/faq").then( () => {
            typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(5): null;
        });
    }
}
