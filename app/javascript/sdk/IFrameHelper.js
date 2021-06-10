import Cookies from 'js-cookie';
import {
  wootOn,
  addClass,
  loadCSS,
  removeClass,
  onLocationChangeListener,
} from './DOMHelpers';
import {
  body,
  widgetHolder,
  createBubbleHolder,
  createBubbleIcon,
  bubbleImg,
  chatBubble,
  closeBubble,
  bubbleHolder,
  createNotificationBubble,
  onClickChatBubble,
  onBubbleClick,
  setBubbleText,
} from './bubbleHelpers';
import { dispatchWindowEvent } from 'shared/helpers/CustomEventHelper';

const EVENT_NAME = 'op2:ready';

export const IFrameHelper = {
  getUrl({ baseUrl, websiteToken }) {
    return `${baseUrl}/widget?website_token=${websiteToken}`;
  },
  createFrame: ({ baseUrl, websiteToken }) => {
    if (IFrameHelper.getAppFrame()) {
      return;
    }

    loadCSS();
    const iframe = document.createElement('iframe');
    const cwCookie = Cookies.get('cw_conversation');
    let widgetUrl = IFrameHelper.getUrl({ baseUrl, websiteToken });
    if (cwCookie) {
      widgetUrl = `${widgetUrl}&cw_conversation=${cwCookie}`;
    }
    iframe.src = widgetUrl;

    iframe.id = 'op2_live_chat_widget';
    iframe.style.visibility = 'hidden';

    let holderClassName = `woot-widget-holder woot--hide woot-elements--${window.$op2.position}`;
    if (window.$op2.hideMessageBubble) {
      holderClassName += ` woot-widget--without-bubble`;
    }
    addClass(widgetHolder, holderClassName);
    widgetHolder.appendChild(iframe);
    body.appendChild(widgetHolder);
    IFrameHelper.initPostMessageCommunication();
    IFrameHelper.initWindowSizeListener();
    IFrameHelper.preventDefaultScroll();
  },
  getAppFrame: () => document.getElementById('op2_live_chat_widget'),
  getBubbleHolder: () => document.getElementsByClassName('woot--bubble-holder'),
  sendMessage: (key, value) => {
    const element = IFrameHelper.getAppFrame();
    element.contentWindow.postMessage(
      `op2-widget:${JSON.stringify({ event: key, ...value })}`,
      '*'
    );
  },
  initPostMessageCommunication: () => {
    window.onmessage = e => {
      if (
        typeof e.data !== 'string' ||
        e.data.indexOf('op2-widget:') !== 0
      ) {
        return;
      }
      const message = JSON.parse(e.data.replace('op2-widget:', ''));
      if (typeof IFrameHelper.events[message.event] === 'function') {
        IFrameHelper.events[message.event](message);
      }
    };
  },
  initWindowSizeListener: () => {
    wootOn(window, 'resize', () => IFrameHelper.toggleCloseButton());
  },
  preventDefaultScroll: () => {
    widgetHolder.addEventListener('wheel', event => {
      const deltaY = event.deltaY;
      const contentHeight = widgetHolder.scrollHeight;
      const visibleHeight = widgetHolder.offsetHeight;
      const scrollTop = widgetHolder.scrollTop;

      if (
        (scrollTop === 0 && deltaY < 0) ||
        (visibleHeight + scrollTop === contentHeight && deltaY > 0)
      ) {
        event.preventDefault();
      }
    });
  },
  events: {
    loaded: message => {
      Cookies.set('cw_conversation', message.config.authToken, {
        expires: 365,
        sameSite: 'Lax',
      });
      window.$op2.hasLoaded = true;
      IFrameHelper.sendMessage('config-set', {
        locale: window.$op2.locale,
        position: window.$op2.position,
        hideMessageBubble: window.$op2.hideMessageBubble,
        showPopoutButton: window.$op2.showPopoutButton,
      });
      IFrameHelper.onLoad({
        widgetColor: message.config.channelConfig.widgetColor,
      });
      IFrameHelper.toggleCloseButton();

      if (window.$op2.user) {
        IFrameHelper.sendMessage('set-user', window.$op2.user);
      }
      dispatchWindowEvent(EVENT_NAME);
    },

    setBubbleLabel(message) {
      if (window.$op2.hideMessageBubble) {
        return;
      }
      setBubbleText(window.$op2.launcherTitle || message.label);
    },

    toggleBubble: () => {
      onBubbleClick();
    },

    onBubbleToggle: isOpen => {
      if (!isOpen) {
        IFrameHelper.events.resetUnreadMode();
      } else {
        IFrameHelper.pushEvent('webwidget.triggered');
      }
    },
    onLocationChange: ({ referrerURL, referrerHost }) => {
      IFrameHelper.sendMessage('change-url', { referrerURL, referrerHost });
    },

    setUnreadMode: message => {
      const { unreadMessageCount } = message;
      const { isOpen } = window.$op2;
      const toggleValue = true;

      if (!isOpen && unreadMessageCount > 0) {
        IFrameHelper.sendMessage('set-unread-view');
        onBubbleClick({ toggleValue });
        const holderEl = document.querySelector('.woot-widget-holder');
        addClass(holderEl, 'has-unread-view');
      }
    },

    resetUnreadMode: () => {
      IFrameHelper.sendMessage('unset-unread-view');
      IFrameHelper.events.removeUnreadClass();
    },

    removeUnreadClass: () => {
      const holderEl = document.querySelector('.woot-widget-holder');
      removeClass(holderEl, 'has-unread-view');
    },
  },
  pushEvent: eventName => {
    IFrameHelper.sendMessage('push-event', { eventName });
  },

  onLoad: ({ widgetColor }) => {
    const iframe = IFrameHelper.getAppFrame();
    iframe.style.visibility = '';
    iframe.setAttribute('id', `op2_live_chat_widget`);

    if (IFrameHelper.getBubbleHolder().length) {
      return;
    }
    createBubbleHolder();
    onLocationChangeListener();
    if (!window.$op2.hideMessageBubble) {
      const chatIcon = createBubbleIcon({
        className: 'woot-widget-bubble',
        src: bubbleImg,
        target: chatBubble,
      });

      const closeIcon = closeBubble;
      const closeIconclassName = `woot-elements--${window.$op2.position} woot-widget-bubble woot--close woot--hide`;
      addClass(closeIcon, closeIconclassName);

      chatIcon.style.background = widgetColor;
      closeIcon.style.background = widgetColor;

      bubbleHolder.appendChild(chatIcon);
      bubbleHolder.appendChild(closeIcon);
      bubbleHolder.appendChild(createNotificationBubble());
      onClickChatBubble();
    }
  },
  toggleCloseButton: () => {
    if (window.matchMedia('(max-width: 668px)').matches) {
      IFrameHelper.sendMessage('toggle-close-button', {
        showClose: true,
      });
    } else {
      IFrameHelper.sendMessage('toggle-close-button', {
        showClose: false,
      });
    }
  },
};
