const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref(app.models.UserModel.name)
      return {
        message
      }
    }
  }).mount('#staff-dashboard')