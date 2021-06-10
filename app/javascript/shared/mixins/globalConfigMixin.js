export default {
  methods: {
    useInstallationName(str = '', installationName) {
      return str.replace(/op2/g, installationName);
    },
  },
};
