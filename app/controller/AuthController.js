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
        // You could have this load a dedicated /#signin page if you wanted.
        // For now, we'll use it to open the modal.
        super.loadView("app/view/home/signin");
        this.attachEventListeners();
    }

    attachEventListeners() {
        $(document).on('click', '#frm-sign-in', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        $(document).on('click', '#btnSignUp', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }

    handleRegister() {
        const formData = {
            name: $("#signupName").val(),
            email: $("#signupEmail").val(),
            password: $("#signupPassword").val(),
            confirmPassword: $("#signupConfirmPassword").val(),
        };

        const rules = {
            name: { required: true, minLength: 5 },
            email: { required: true, email: true },
            password: { required: true, passwordStrength: true },
            confirmPassword: { required: true, confirmPassword: 'password' }
        };

        const errors = Model.validateData(formData, rules);
        if (Object.keys(errors).length > 0) {
            Model.displayValidationErrors(errors, 'invalid-feedback', 'signup-');
        } else {
             app.request({
                url: this.userModel.api.register,
                method: "POST",
                data: JSON.stringify({
                    username: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
                success: (response) => {
                    // Assuming the registration response has the same structure as login
                    this.userModel.fromJson(response.data);
                    Model.setLocalData(this.userModel.toJson());
                    window.location.hash = "#UserController?index"; // Redirect to user page
                },
           });
        }
    }


    handleLogin() {
        const formData = {
            email: $("#signinEmail").val(),
            password: $("#signinPassword").val(),
        };

        const rules = {
            email: { required: true, email: true },
            password: { required: true, passwordStrength: true },
        };

        const errors = Model.validateData(formData, rules);

        grecaptcha.ready(function() {
          grecaptcha.execute(userConfig.keys.recaptchaSiteKey, {action: 'submit'}).then(function(token) {
            if (Object.keys(errors).length > 0) {
                Model.displayValidationErrors(errors, 'invalid-feedback', 'signin-');
            } else {
            app.request({
                    url: this.userModel.api.login,
                    method: "POST",
                    data: JSON.stringify(formData),
                    success: (response) => {
                        this.userModel.fromJson(response.data);
                        Model.setLocalData(this.userModel.toJson());
                        $(document).trigger('login-success'); // Notify UI to update
                        $('#genericModal').modal('hide'); // Close the modal
                        window.location.hash = "#StaffController?index"; // Redirect to user page
                    },
            });
            }
          });
        });
    }
}