export default {
  computed: {
    hostURL() {
      return window.op2Config.hostURL;
    },
    twilioCallbackURL() {
      return `${this.hostURL}/twilio/callback`;
    },
    vapidPublicKey() {
      return window.op2Config.vapidPublicKey;
    },
    enabledLanguages() {
      return window.op2Config.enabledLanguages;
    },
  },
};
