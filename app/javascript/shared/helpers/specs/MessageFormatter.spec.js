import MessageFormatter from '../MessageFormatter';

describe('#MessageFormatter', () => {
  describe('content with links', () => {
    it('should format correctly', () => {
      const message =
        'bnk2 is an opensource tool. [op2](https://www.op2.com)';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>bnk2 is an opensource tool. <a rel="noreferrer noopener nofollow" href="https://www.op2.com" class="link" title="" target="_blank">op2</a></p>'
      );
    });
    it('should format correctly', () => {
      const message =
        'bnk2 is an opensource tool. https://www.op2.com';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>bnk2 is an opensource tool. <a rel="noreferrer noopener nofollow" href="https://www.op2.com" class="link" title="" target="_blank">https://www.op2.com</a></p>'
      );
    });
  });

  describe('parses heading to strong', () => {
    it('should format correctly', () => {
      const message = '### opensource \n ## tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<strong>opensource</strong><strong>tool</strong>'
      );
    });
  });

  describe('tweets', () => {
    it('should return the same string if not tags or @mentions', () => {
      const message = 'bnk2 is an opensource tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(message);
    });

    it('should add links to @mentions', () => {
      const message =
        '@op2app is an opensource tool thanks @longnonexistenttwitterusername';
      expect(new MessageFormatter(message, true).formattedMessage).toMatch(
        '<p><a href="http://twitter.com/op2app" target="_blank" rel="noreferrer nofollow noopener">@op2app</a> is an opensource tool thanks @longnonexistenttwitterusername</p>'
      );
    });

    it('should add links to #tags', () => {
      const message = '#op2app is an opensource tool';
      expect(new MessageFormatter(message, true).formattedMessage).toMatch(
        '<p><a href="https://twitter.com/hashtag/op2app" target="_blank" rel="noreferrer nofollow noopener">#op2app</a> is an opensource tool</p>'
      );
    });
  });

  describe('plain text content', () => {
    it('returns the plain text without HTML', () => {
      const message =
        '<b>bnk2 is an opensource tool. https://www.op2.com</b>';
      expect(new MessageFormatter(message).plainText).toMatch(
        'bnk2 is an opensource tool. https://www.op2.com'
      );
    });
  });
});
