export default {
  computed: {
    useInboxAvatarForBot() {
      return window.op2WidgetDefaults.useInboxAvatarForBot;
    },
    hasAConnectedAgentBot() {
      return !!window.op2WebChannel.hasAConnectedAgentBot;
    },
    inboxAvatarUrl() {
      return window.op2WebChannel.avatarUrl;
    },
    channelConfig() {
      return window.op2WebChannel;
    },
    hasEmojiPickerEnabled() {
      return this.channelConfig.enabledFeatures.includes('emoji_picker');
    },
    hasAttachmentsEnabled() {
      return this.channelConfig.enabledFeatures.includes('attachments');
    },
    preChatFormEnabled() {
      return window.op2WebChannel.preChatFormEnabled;
    },
    preChatFormOptions() {
      const options = window.op2WebChannel.preChatFormOptions || {};
      return {
        requireEmail: options.require_email,
        preChatMessage: options.pre_chat_message,
      };
    },
  },
};
