---
layout: post
type: post
title: Heroku Error Tracker Systems
cover: /assets/post-assets/009-heroku-error-tracker-systems/img/thumb.jpg
styles: <link rel="stylesheet" href="/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/css/main.css" type="text/css" media="screen" /> <link rel="stylesheet" href="/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/css/gruvbox.css" type="text/css" media="screen" />
date: 2018-09-14 14:38:00 +0000
---
{::options parse_block_html="true" /}

<div class="container">

# Heroku error tracking systems:

{:.date}
{{ page.date | date: "%B %e, %Y" }}

Error tracking systems are available on Heroku as addons, you can enable from the command line and install in your app very straigthforward. I have tried with 3 of them and this is what I think about them:

![Honeybadger](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/hero_badger.png){:class="img-logo"} vs ![Rollbar](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/rollbar.png){:class="img-logo"} vs ![Sentry](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/sentry-glyph-black.png){:class="img-logo"}

### [Honeybadger](https://www.honeybadger.io/)

Nice tool for monitoring Ruby on Rails exceptions, in principal features of this product track my attention to this:

- Can create issues on Github, Jira and other issue trackers
- Send notifications throug Slack channels
- In Honeybadger dashboard you can see: Request Parameters, Headers, User Information, Error Information, Full Backtrace of error, and more.
- Track of web services, when crashed you recive a notification by email

![](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/Screenshot_20180905_124942.png){:class="img-responsive"}

As many other issue trackers as we will see, you can change the status from "Unresolved" to "Resolved", see the error and the backtrace

![](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/Screenshot_20180905_125034.png){:class="img-responsive"}

As I said, very nice tool. But the price...

![](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/Screenshot_20180905_125217.png){:class="img-responsive"}

In my small projects can not afford to pay even the smallest plan, so I have to look over there, and I find other free solutions.

[Heroku Addon Honeybadger](https://elements.heroku.com/addons/honeybadger)

### [Rollbar](https://rollbar.com/)

Love this tool, rollbar has almost the same features as Honeybadger but it has a free plan for hobbies that let you take 5,000 free error events per month, that is a lot for small-hobbie projects. You can set unlimited users and unlimited projects for free, the default data retention are 30 days.

![](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/Screenshot_20180905_130350.png){:class="img-responsive"}

I add rollbar to one of my apps and I love the process, very easy without complications, just add the gem into Gemfile and run bundle to install, then generate config initializer for rollbar and that is it. You should be able to see the errors in the dashboard like this:

![](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/Screenshot_20180905_130350.png){:class="img-responsive"}

also you can run `rake rollbar:test` for test your configurations, and recive an email with the details of the error:

![](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/Screenshot_20180906_095637.png){:class="img-responsive"}

[Heroku Addon Rollbar](https://elements.heroku.com/addons/rollbar)

### [Sentry](https://sentry.io/welcome/)

Is an open source tool that allows you to[ install in own server](https://docs.sentry.io/server/installation/) via [Docker image](https://github.com/getsentry/onpremise) or PIP Python way.

Also you can reach a plan that gives you sentry as a service like Honeybadger or Rollbar

![](/cg-blog/assets/post-assets/009-heroku-error-tracker-systems/img/Screenshot_20180905_144317.png){:class="img-responsive"}

Sentry has the ability to catch errors as you deploy your app, the logs that generates includes all information about your environment, software, user calls, and obviously the error trace. Besides has integration with Jira, GitHub, Slack, GitLab, and Heroku

![](https://sentry.io/_assets/screenshots/features-page-dash-e8a6fd442fa9d8785ddeb665ea8f55f9ca940de4d8b1d90517ae35e650a259c7.jpg){:class="img-responsive"}

[Heroku Addon Sentry](https://elements.heroku.com/addons/sentry)

***

{:.date}
#### Carlos Gomez 2018

</div>