import {
  stripTrailingSlash,
  formatCampaigns,
  filterCampaigns,
} from '../campaignHelper';
import campaigns from './camapginFixtures';
describe('#Campagin Helper', () => {
  describe('stripTrailingSlash', () => {
    it('should return striped trailing slash if url with trailing slash is passed', () => {
      expect(
        stripTrailingSlash({ URL: 'https://www.op2.com/pricing/' })
      ).toBe('https://www.op2.com/pricing');
    });
  });

  describe('formatCampaigns', () => {
    it('should return formated campaigns if camapgins are passed', () => {
      expect(formatCampaigns({ campaigns })).toStrictEqual([
        {
          id: 1,
          timeOnPage: 3,
          url: 'https://www.op2.com/pricing',
        },
        {
          id: 2,
          timeOnPage: 6,
          url: 'https://www.op2.com/about',
        },
      ]);
    });
  });
  describe('filterCampaigns', () => {
    it('should return filtered campaigns if formatted camapgins are passed', () => {
      expect(
        filterCampaigns({
          campaigns: [
            {
              id: 1,
              timeOnPage: 3,
              url: 'https://www.op2.com/pricing',
            },
            {
              id: 2,
              timeOnPage: 6,
              url: 'https://www.op2.com/about',
            },
          ],
          currentURL: 'https://www.op2.com/about/',
        })
      ).toStrictEqual([
        {
          id: 2,
          timeOnPage: 6,
          url: 'https://www.op2.com/about',
        },
      ]);
    });
  });
});
