export default class HomeController extends Controller {
    constructor() {
        super();
    }

    setHeader(index) {
        typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(index): null;
        app.singletons.header.showUserAreaVisibility();
    }

    index() {
        super.loadView("app/view/home/content").then( () => {
            this.setHeader(0);
        });
    }

    about() {
        super.loadView("app/view/home/about").then( () => {
            this.setHeader(1);
        });
    }

    contact() {
        super.loadView("app/view/home/contact").then( () => {
            this.setHeader(3);
        });
    }

    services() {
        super.loadView("app/view/home/services", "app/src/css/pages/services.css", "app/src/js/home/services.js").then( () => {
            this.setHeader(2);
            // Start the check when the script executes
        });
    }

    // blog() {
    //     super.loadView("app/view/home/blog").then( () => {
    //         typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(4): null;
    //     });
    // }

    // faq() {
    //     super.loadView("app/view/home/faq").then( () => {
    //         typeof app.singletons["header"] !== "undefined" ? app.singletons["header"].setActiveMenuItem(5): null;
    //     });
    // }
}
