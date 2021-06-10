<p align="center">
  <img src="https://s3.us-west-2.amazonaws.com/gh-assets.op2.com/brand.svg" alt="Woot-logo" width="240" />

  <p align="center">Customer engagement suite, an open-source alternative to Intercom, Zendesk, Salesforce Service Cloud etc.</p>
</p>

<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/op2/op2/tree/master" alt="Deploy to Heroku">
     <img alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
</p>

___

<p align="center">
  <a href="https://codeclimate.com/github/op2/op2/maintainability"><img src="https://api.codeclimate.com/v1/badges/80f9e1a7c72d186289ad/maintainability" alt="Maintainability"></a>
  <img src="https://img.shields.io/circleci/build/github/op2/op2" alt="CircleCI Badge">
    <a href="https://hub.docker.com/r/op2/op2/"><img src="https://img.shields.io/docker/pulls/op2/op2" alt="Docker Pull Badge"></a>
  <a href="https://hub.docker.com/r/op2/op2/"><img src="https://img.shields.io/docker/cloud/build/op2/op2" alt="Docker Build Badge"></a>
  <img src="https://img.shields.io/github/license/op2/op2" alt="License">
  <img src="https://img.shields.io/github/commit-activity/m/op2/op2" alt="Commits-per-month">
  <a title="Crowdin" target="_self" href="https://op2.crowdin.com/op2"><img src="https://badges.crowdin.net/e/37ced7eba411064bd792feb3b7a28b16/localized.svg"></a>
  <a href="https://discord.gg/cJXdrwS"><img src="https://img.shields.io/discord/647412545203994635" alt="Discord"></a>
  <a href="https://huntr.dev/bounties/disclose"><img src="https://cdn.huntr.dev/huntr_security_badge_mono.svg" alt="Huntr"></a>
</p>

<img src="https://s3.us-west-2.amazonaws.com/gh-assets.op2.com/op2-dashboard-assets.png" width="100%" alt="Chat dashboard"/>

bnk2 is an open-source omnichannel customer support software. The development of bnk2 started in 2016. It failed to succeed as a business and eventually shut up shop in 2017. During 2019 #Hacktoberfest, the maintainers decided to make it open-source, instead of letting the code rust in a private repo. With a pleasant surprise, bnk2 became a trending project on Hacker News and best of all, got lots of love from the community.
Now, a failed project is back on track and the prospects are looking great. The team is back to working on the project and this time, we are building it in the open. Thanks to the ideas and contributions from the community.

---

### Features

bnk2 gives an integrated view of conversations happening in different communication channels.

It supports the following conversation channels:

 - **Website**: Talk to your customers using our live chat widget and make use of our SDK to identify a user and provide contextual support.
 - **Facebook**: Connect your Facebook pages and start replying to the direct messages to your page.
 - **Twitter**: Connect your Twitter profiles and reply to direct messages or the tweets where you are mentioned.
 - **Whatsapp**: Connect your Whatsapp business account and manage the conversation in op2
 - **SMS**: Connect your Twilio SMS account and reply to the SMS queries in op2
 - **API Channel**: Build custom communication channels using our API channel.
 - **Email (beta)**: Forward all your email queries to bnk2 and view it in our integrated dashboard.

Other features include:

- **Multi-brand inboxes**: Manage multiple brands or pages using a single dashboard.
- **Private notes**: Inter team communication is possible using private notes in a conversation.
- **Canned responses (Saved replies)**: Improve the response rate by adding saved replies for frequently asked questions.
- **Conversation Labels**: Use conversation labelling to create custom workflows.
- **Auto assignment**: bnk2 intelligently assigns a ticket to the agents who have access to the inbox depending on their availability and load.
- **Conversation continuity**: If the user has provided an email address through the chat widget, bnk2 would send an email to the customer under the agent name so that the user can continue the conversation over the email.
- **Multi-lingual support**: bnk2 supports 10+ languages.
- **Powerful API & Webhooks**: Extend the capability of the software using op2’s webhooks and APIs.
- **Integrations**: bnk2 natively integrates with Slack right now. Manage your conversations in Slack without logging into the dashboard.

---

### Documentation

Detailed documentation is available at [www.op2.com/help-center](https://www.op2.com/help-center).

### Translation process

The translation process for bnk2 web and mobile app is managed at [https://translate.op2.com](https://translate.op2.com) using Crowdin. Please read the [translation guide](https://www.op2.com/docs/contributing/translating-op2-to-your-language) for contributing to op2.

---

### Branching model

We use the [git-flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model. The base branch is `develop`.
If you are looking for a stable version, please use the `master` or tags labelled as `v1.x.x`.

---

### Deployment

#### Heroku one-click deploy

Deploying bnk2 to Heroku is a breeze. It's as simple as clicking this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/op2/op2/tree/master)

Follow this [link](https://www.op2.com/docs/environment-variables) to understand setting the correct environment variables for the app to work with all the features. There might be breakages if you do not set the relevant environment variables.

#### Other deployment options

Please follow [deployment architecture guide](https://www.op2.com/docs/deployment/architecture) to deploy with Docker or Caprover.

---

### Contributors ✨

Thanks goes to all these [wonderful people](https://www.op2.com/docs/contributors):

<a href="https://github.com/op2/op2/graphs/contributors"><img src="https://opencollective.com/op2/contributors.svg?width=890&button=false" /></a>


*op2* &copy; 2017-2021, bnk2 Inc - Released under the MIT License.
