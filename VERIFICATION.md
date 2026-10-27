# Evidence check (2026-10-27)

Every quote in the reviewed guides was re-fetched from its source URL and string-matched (exact, or 85% of 5-word shingles). "Page not readable" usually means the page renders with JavaScript or blocks scripts; those quotes were then checked by hand in a browser (see notes).

| Guide | Quotes | Found | Not found | Page not readable |
|---|---|---|---|---|
| GitHub | 33 | 32 | 1 | 0 |
| Google (Gmail API) | 18 | 14 | 4 | 0 |
| ServiceNow | 18 | 6 | 12 | 0 |
| Shopify | 29 | 24 | 4 | 1 |
| Slack | 31 | 27 | 4 | 0 |
| Spotify | 29 | 27 | 2 | 0 |

## GitHub

| Result | Source | Quote |
|---|---|---|
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app | A user or organization can own up to 100 OAuth apps. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app | You can enter up to 10 callback URLs. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app | Expire user access tokens is enabled by default. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | The access token expires after eight hours, and the refresh token expires after six months without use. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | The temporary code will expire after 10 minutes. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | When wildcard matching is disabled, the redirect URL must exactly match the callback URL. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | Apps that had a single callback URL enabled prior to August 3, 2026 have wildcard matching enabled for that callback URL. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | Once you use a refresh token, that refresh token and the old access token will no longer work. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | There is a limit of ten tokens that are issued per user/application/scope combination, and a rate limit of ten tokens created per hour. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | The user must enter a valid code within 15 minutes (or 900 seconds). |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps | Must be `S256` - the `plain` code challenge method is not supported. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps | In general, GitHub Apps are preferred over OAuth apps. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps | OAuth tokens use the user's rate limit of 5,000 requests per hour. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps | Installation access tokens expire after a predefined amount of time (currently 1 hour). |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps | OAuth app tokens re long-lived by default. |
| found | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps | GitHub Apps aren't subject to organization application policies. |
| found | https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data/about-oauth-app-access-restrictions | When you create a new organization, OAuth app access restrictions are enabled by default. |
| found | https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data/about-oauth-app-access-restrictions | When an organization has not set up OAuth app access restrictions, any OAuth app authorized by an organization member can also access the or |
| found | https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data/approving-oauth-apps-for-your-organization | After you review the information about the requested application, click **Grant access**. |
| found | https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens | The user access token expires after eight hours, and the refresh token expires after six months. |
| found | https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/about-github-marketplace-for-apps | To publish apps with free plans, you only need to meet the general requirements for listing any app. |
| found | https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/requirements-for-listing-an-app | OAuth apps should have a minimum of 200 users. |
| found | https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/requirements-for-listing-an-app | GitHub Apps should have a minimum of 100 installations. |
| found | https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/requirements-for-listing-an-app | Listings must have a valid link to a privacy policy. |
| found | https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/submitting-your-listing-for-publication | An onboarding expert will reach out to you with additional information. |
| found | https://github.blog/changelog/2026-08-14-multiple-redirect-uris-and-token-refresh-for-oauth-apps/ | OAuth apps can now register up to 10 redirect URIs |
| found | https://github.blog/changelog/2026-08-14-multiple-redirect-uris-and-token-refresh-for-oauth-apps/ | Short-lived tokens are enabled by default for all new applications. |
| found | https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-single-sign-on/about-authentication-with-single-sign-on | You must have an active SSO session each time you authorize an OAuth app or GitHub App in order to access an organization that uses or enfor |
| found | https://docs.composio.dev/toolkits/github | Composio-managed OAuth available |
| NOT FOUND | https://docs.composio.dev/toolkits/github | Composio does not currently provide the GitHub App installation link automatically during this flow. |
| found | https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app | Managed auth enforces a 15-minute minimum polling interval |
| found | https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app | Managed apps share quota across all Composio users. |
| found | https://docs.composio.dev/toolkits/managed-auth | You can also provide your own OAuth app to show your app name on the consent screen, request custom scopes, or use a separate rate-limit quo |

## Google (Gmail API)

| Result | Source | Quote |
|---|---|---|
| found | https://support.google.com/cloud/answer/15549945 | Projects configured with a publishing status of Testing are limited to up to 100 test users listed in the OAuth consent screen. |
| found | https://support.google.com/cloud/answer/15549945 | Authorizations by a test user will expire seven days from the time of consent. |
| found | https://support.google.com/cloud/answer/15549945 | 100 new users in total, after the app presents the unverified app screen |
| found | https://support.google.com/cloud/answer/15549945 | The user cap applies over the entire lifetime of the project, and it cannot be reset or changed. |
| NOT FOUND | https://developers.google.com/identity/protocols/oauth2 | publishing status of "Testing" is issued a refresh token expiring in 7 days |
| NOT FOUND | https://developers.google.com/identity/protocols/oauth2 | There is currently a limit of 100 refresh tokens per Google Account per OAuth 2.0 client ID. |
| NOT FOUND | https://developers.google.com/workspace/gmail/api/auth/scopes | If you store restricted scope data on servers (or transmit), then you must go through a security assessment. |
| found | https://support.google.com/cloud/answer/13464325 | https://www.googleapis.com/auth/gmail.readonly |
| found | https://support.google.com/cloud/answer/13464321 | The homepage must be hosted on a verified domain you own |
| found | https://support.google.com/cloud/answer/13464321 | submitting to an annual security assessment from a Google empanelled group of security assessors |
| found | https://support.google.com/cloud/answer/13465431 | Applications are assigned to either the AL1 or AL2 assurance level. |
| NOT FOUND | https://support.google.com/cloud/answer/13463817 | Restricted Scope Verification: 6 weeks |
| found | https://support.google.com/cloud/answer/13463817 | Google does not charge the developer any fees for security assessment. |
| found | https://support.google.com/cloud/answer/13464323 | Your app will not be subject to the unverified app screen or the 100-user cap if it's designated as internal-only. |
| found | https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification | at least every 12 months after your assessor's Letter of Assessment (LOA) approval date |
| found | https://www.leviathansecurity.com/programs/google-casa-cloud-application-security-assessment | Start your assessment within 30 days |
| found | https://docs.composio.dev/toolkits/gmail | Composio-managed OAuth available |
| found | https://docs.composio.dev/toolkits/managed-auth | You can also provide your own OAuth app to show your app name on the consent screen, request custom scopes, or use a separate rate-limit quo |

## ServiceNow

| Result | Source | Quote |
|---|---|---|
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/t_CreateEndpointforExternalClients.html | By default, refresh tokens expire in 100 days (8640000 seconds). |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/t_CreateEndpointforExternalClients.html | By default, access tokens expire in 30 minutes (1800 seconds). |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/t_CreateEndpointforExternalClients.html | Navigate to All > System OAuth > Application Registry and then click New. On the interceptor page, click Create an OAuth API endpoint for ex |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/t_CreateEndpointforExternalClients.html | The instance matches the URL of the incoming request to one of the redirect URLs. If no match is made, the instance uses the first redirect  |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/configure-an-oauth-authorization-code-grant.html | Navigate to Machine Identity Console > Inbound integrations > New integration > OAuth - Authorization code grant. |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/configure-an-oauth-authorization-code-grant.html | The default value is 8,640,000 seconds. |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/c_OAuthAuthorizationCodeFlow.html | https://myinstance.service-now.com/oauth_auth.do?response_type=code&redirect_uri={the_redirect_url}&client_id={the_client_identifier} |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/c_OAuthAuthorizationCodeFlow.html | In the ServiceNow implementation, the end user must be logged into the instance. The instance prompts the end user with a UI page that has A |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/client-credentials.html | Inbound client credentials grant type is a capability that can be controlled through a system property. By default the system property is fa |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/new-inbound-integrations.html | On the instance, navigate to All > Machine Identity Console > Inbound integrations > New integration. Choose the application connection type |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/cimd-inbound.html | CIMD is available from Zurich Patch 7 onward and from Australia Patch 1 onward. |
| NOT FOUND | https://www.servicenow.com/docs/r/platform-security/authentication/cimd-inbound.html | An instance doesn't accept clients on its own ... you register each CIMD client before it can connect. |
| found | https://www.servicenow.com/community/platform-privacy-security-blog/choose-the-right-oauth-grant-type-for-servicenow-integration/ba-p/3385352 | Since there is no user context, the actions performed using this grant type are attributed to the application itself. |
| found | https://www.servicenow.com/community/app-publisher-blog/guide-to-getting-your-app-certified-and-certification/ba-p/2477630 | Certification, from design complete and submission for certification to ready for publishing on the store, typically requires 3-5 weeks. |
| found | https://www.servicenow.com/community/app-publisher-blog/guide-to-getting-your-app-certified-and-certification/ba-p/2477630 | Note that you must be a Build Partner to list an application on the ServiceNow Store. |
| found | https://docs.composio.dev/toolkits/servicenow | Composio-managed OAuth not available |
| found | https://docs.composio.dev/toolkits/managed-auth | Register your own OAuth app when a toolkit does not have managed OAuth. Then create a custom auth config with the app's client ID and client |
| found | https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app | Self-hosted or regional variants (e.g., a private Salesforce subdomain) need their own OAuth app. |

## Shopify

| Result | Source | Quote |
|---|---|---|
| found | https://shopify.dev/docs/apps/launch/distribution | You can't change the distribution method after you select it. |
| found | https://shopify.dev/docs/apps/launch/distribution | Installed on a single Shopify store, on multiple stores that belong to the same Plus organization, or on development stores |
| found | https://shopify.dev/docs/apps/launch/distribution | Shopify admin (no longer available for new apps) ... Can't be created anymore, though existing apps keep working |
| found | https://changelog.shopify.com/posts/legacy-custom-apps-can-t-be-created-after-january-1-2026 | Starting January 1, 2026, you can no longer create new custom apps in the Shopify admin. |
| found | https://shopify.dev/docs/apps/launch/distribution/select-distribution-method | The Distribution card appears only for apps that belong to a Partner organization. |
| NOT FOUND | https://shopify.dev/docs/apps/launch/distribution/select-distribution-method | If you selected Custom distribution, then generate an install link and send it to the store owner. |
| found | https://shopify.dev/docs/apps/launch/app-store-review/review-process | Shopify's app requirements are the same for both fully visible and limited visibility public apps. |
| found | https://shopify.dev/docs/apps/launch/app-store-review/submit-app-for-review | Applying for protected customer data isn't possible while the app is under review. |
| found | https://shopify.dev/docs/apps/launch/app-store-review/submit-app-for-review | The app icon must be 1200 x 1200 pixels in size and in either JPEG or PNG format. |
| NOT FOUND | https://community.shopify.dev/t/longer-app-store-review-times-what-you-need-to-know/31728 | review times are longer than usual right now, and we apologize for the wait. |
| found | https://community.shopify.com/t/how-long-does-it-take-for-an-app-review-to-be-completed/264027 | It usually takes anywhere from 5-10 business days for the submission to be reviewed by our team |
| found | https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements | Your app must not request the manual entry of a myshopify.com URL or a shop's domain during the installation or configuration flow. |
| found | https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements | All apps in the Shopify App Store must be operational through a UI regardless of how the app is launched. |
| found | https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements | Your app must immediately authenticate using OAuth before any other steps occur. |
| found | https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements | As of April 1, 2025 all new public apps must be built exclusively with the GraphQL Admin API. |
| found | https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements | Apps that use off-platform billing cannot be distributed through the Shopify App store. |
| found | https://shopify.dev/docs/apps/launch/protected-customer-data | Customer data including name, address, phone, or email fields |
| found | https://shopify.dev/docs/apps/launch/protected-customer-data | You don't need to submit a request for review for apps that are installed only on development stores. |
| found | https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance | Complete the action within 30 days of receiving the request. |
| found | https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance | 48 hours after a store owner uninstalls your app, Shopify sends a payload on the shop/redact topic. |
| found | https://shopify.dev/docs/apps/build/authentication-authorization/authenticate-standalone-apps | Must exactly match a redirect URI you've configured in the Dev Dashboard or your app's configuration TOML file. |
| NOT FOUND | https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/offline-access-tokens | Refresh token for an expiring offline access token / 90 days (refresh_token_expires_in is 7776000) when issued. |
| found | https://shopify.dev/changelog/expiring-offline-access-tokens-required-for-all-public-apps-as-of-january-1-2027 | Starting January 1, 2027, all public apps must use expiring offline access tokens when calling the Admin API. |
| found | https://shopify.dev/docs/apps/build/stores/development-stores | Organizations are limited to 250 dev stores. |
| page not readable (403) | https://help.shopify.com/en/partners/about | The Shopify Partner Program is a global partner community that is free to join |
| found | https://shopify.dev/docs/apps/launch/distribution/revenue-share | you need to register with the Shopify App Store for a one-time fee of $19 USD per Partner account. If you distribute your app to multiple me |
| NOT FOUND | https://docs.composio.dev/toolkits/shopify | Composio-managed OAuth available? No |
| found | https://composio.dev/auth/shopify | https://backend.composio.dev/api/v3/toolkits/auth/callback |
| found | https://docs.composio.dev/toolkits/managed-auth | Register your own OAuth app when a toolkit does not have managed OAuth. |

## Slack

| Result | Source | Quote |
|---|---|---|
| found | https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps | The new rate limits will be updated to allow 1 request per minute and will return a maximum of 15 objects per request. |
| found | https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps | New non-Marketplace applications and new installations of existing non-Marketplace applications will be subject to the updated rate limits i |
| found | https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps | Internal customer-built applications are not impacted by these changes and continue to have a rate limit of 1,000 messages per request at 50 |
| found | https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps | Slack does not charge for Marketplace inclusion |
| found | https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps | Unlisted apps, by contrast, are for development and testing |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide | Your app has been installed on 10 or more active workspaces ... An active workspace is a workspace that has been used in the past 28 days. |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide | the preliminary part of the review takes up to 10 business days to receive feedback, while the functional review takes up to 10 weeks for ne |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide | During this part of the review, your place in the queue is reset each time you resubmit. |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide | Once your app is published in the Slack Marketplace, the live version of your app is locked. |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-app-guidelines-and-requirements | All Slack Marketplace apps must include a clear privacy policy that details how third-party data is handled |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-app-guidelines-and-requirements | keep it short and sweet at 10 words (or fewer) |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-app-guidelines-and-requirements | use Slack data to train Large Language Models (LLMs). |
| found | https://docs.slack.dev/slack-marketplace/slack-marketplace-app-guidelines-and-requirements | your submission will be subject to an enhanced review ... These scopes include: search:read.* , *:history , files:read , and canvases:read |
| found | https://docs.slack.dev/authentication/installing-with-oauth | The redirect_uri must use HTTPS. |
| found | https://docs.slack.dev/authentication/installing-with-oauth | That's your temporary authorization code, which expires after ten minutes. |
| found | https://docs.slack.dev/authentication/installing-with-oauth | OAuth tokens do not expire. |
| found | https://docs.slack.dev/authentication/installing-with-oauth | invalid_team_for_non_distributed_app: Occurs when attempting to install/authorize an undistributed Slack API app on a team where the app was |
| found | https://docs.slack.dev/authentication/using-token-rotation | Without token rotation, the access token never expires. With token rotation, it expires every 12 hours. |
| found | https://docs.slack.dev/authentication/using-token-rotation | Token rotation may not be turned off once it's turned on |
| found | https://docs.slack.dev/authentication/using-token-rotation | we will enforce a limit of 2 active tokens |
| NOT FOUND | https://docs.slack.dev/app-management/distribution | Scroll to Share Your App with Other Workspaces within the Manage Distribution section. ... Click Activate Public Distribution. |
| found | https://docs.slack.dev/app-management/distribution | Your app must support SSL for all of the following URLs: OAuth redirect URLs |
| found | https://docs.slack.dev/app-management/distribution | Other workspaces may only allow the installation of apps officially listed in the Slack Marketplace. |
| found | https://slack.com/help/articles/222386767-Manage-app-approval-for-your-workspace | by default, members can install them without approval from a Workspace Owner. |
| NOT FOUND | https://slack.com/help/articles/1500009181142-Manage-app-settings-and-permissions | Limit members to installing apps from the Slack Marketplace. |
| found | https://docs.slack.dev/reference/methods/conversations.history | Tier 3: 50+ per minute |
| found | https://docs.composio.dev/toolkits/managed-auth | You can also provide your own OAuth app to show your app name on the consent screen, request custom scopes, or use a separate rate-limit quo |
| NOT FOUND | https://docs.composio.dev/toolkits/slack | Composio is working on Marketplace review for the managed Slack app. |
| NOT FOUND | https://docs.composio.dev/toolkits/slack | when installing non-Marketplace apps, you'll need to be an owner to install directly and complete the connection. |
| found | https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app | Managed apps share quota across all Composio users. |
| found | https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app | Managed auth enforces a 15-minute minimum polling interval |

## Spotify

| Result | Source | Quote |
|---|---|---|
| found | https://developer.spotify.com/documentation/web-api/concepts/quota-modes | Up to 5 authenticated Spotify users can use an app that is in development mode |
| found | https://developer.spotify.com/documentation/web-api/concepts/quota-modes | The app owner must have a Spotify Premium account for apps in development mode to function. |
| found | https://developer.spotify.com/documentation/web-api/concepts/quota-modes | as of May 15th 2025, Spotify only accepts applications from organizations (not individuals) |
| found | https://developer.spotify.com/documentation/web-api/concepts/quota-modes | Maintaining a minimum of active users (at least 250k MAUs) |
| found | https://developer.spotify.com/documentation/web-api/concepts/quota-modes | This review process can take up to six weeks. |
| found | https://developer.spotify.com/documentation/web-api/concepts/quota-modes | API requests with an access token associated to that user and app will receive a 403 status code error. |
| found | https://developer.spotify.com/documentation/web-api/concepts/quota-modes | Application must be sent through a company email |
| found | https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security | Each Client ID will be limited to up to five authorized users |
| found | https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security | personal projects for non-commercial use by individual developers |
| found | https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security | we have decided to postpone endpoint access changes for existing integrations |
| found | https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide | Existing apps are grandfathered: If you already have multiple Client IDs or more than 5 users, you will retain them. |
| found | https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide | Extended Quota Mode apps: No migration required. |
| NOT FOUND | https://developer.spotify.com/documentation/web-api/references/changes/july-2026 | Client IDs per developer: Increased from 1 to 25. |
| found | https://developer.spotify.com/documentation/web-api/references/changes/july-2026 | API quotas for development mode are now counted per developer account rather than per Client ID. |
| found | https://developer.spotify.com/blog/2025-04-15-updating-the-criteria-for-web-api-extended-access | Starting May 15, 2025, extended Web API access will be reserved for apps with established, scalable, and impactful use cases |
| found | https://developer.spotify.com/blog/2025-04-15-updating-the-criteria-for-web-api-extended-access | over 95% of the applications we receive for extended Web API access fall short of basic security, privacy, and licensing standards |
| found | https://developer.spotify.com/documentation/web-api/concepts/redirect_uri | `localhost` is not allowed as redirect URI. |
| found | https://developer.spotify.com/documentation/web-api/concepts/redirect_uri | Use HTTPS for your redirect URI, unless you are using a loopback address, when HTTP is permitted. |
| found | https://developer.spotify.com/documentation/web-api/concepts/redirect_uri | We expect all clients to migrate to the new redirect URI validation by November 2025. |
| found | https://developer.spotify.com/blog/2025-02-12-increasing-the-security-requirements-for-integrating-with-spotify | All clients created from the 9th of April 2025 will have the new rules enforced automatically |
| found | https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens | Access tokens are intentionally configured to have a limited lifespan (1 hour) |
| found | https://developer.spotify.com/documentation/web-api/concepts/apps | they will be displayed to the user on the grant screen |
| found | https://developer.spotify.com/policy | Do not use the Spotify Platform or any Spotify Content to train a machine learning or AI model or otherwise ingest Spotify Content into a ma |
| found | https://developer.spotify.com/policy | Do not create a voice-enabled SDA that enables a user to control Spotify with their voice, or any kind of voice assistant that provides voic |
| found | https://developer.spotify.com/policy | Do not build products or services which are targeted for use by businesses |
| found | https://developer.spotify.com/policy | You must provide a privacy policy which clearly describes how you intend to access, use, process and disclose user data. |
| found | https://developer.spotify.com/terms | delete the applicable Spotify Personal Data in your possession or control within five (5) days |
| NOT FOUND | https://docs.composio.dev/toolkits/spotify | Composio does not provide a default OAuth app for Spotify. Create your own OAuth app in the Spotify Developer Dashboard to use the Spotify t |
| found | https://docs.composio.dev/toolkits/managed-auth | Register your own OAuth app when a toolkit does not have managed OAuth. Then create a custom auth config with the app's client ID and client |


## Second and third pass (2026-10-28)

The first pass fetches raw HTML. Quotes it could not match were re-checked:

1. **Rendered in headless Chromium** (`tools/verify-rendered.mjs`): confirmed Shopify distribution (2), Shopify Partner Program, Slack distribution (3), Slack admin settings, Spotify July 2026 changelog (1 of 2), Composio GitHub toolkit page (1 of 3).
2. **Fetched server-side and read in full** (pages that render client-side or block headless browsers):
   - ServiceNow docs (6 pages, 12 quotes): all supported. Navigation paths show as "All > System OAuth > Application Registry" in the guide; on the page the separators are icons, so raw text reads "AllSystem OAuthApplication Registry".
   - Google verification timelines (support.google.com/cloud/answer/13463817): "Restricted Scope Verification: 6 weeks" is in a table; supported, with Google's caveat that estimates "are not guaranteed".
   - Composio toolkit pages (Slack, GitHub, Spotify, Shopify): supported, except one item below.
   - Spotify July 2026 changelog: "Increased from 1 to 25" (client IDs per developer) supported; it is in a table.
   - Shopify offline tokens: "90 days (refresh_token_expires_in is 7776000) when issued" supported (table cell).
   - Shopify community thread: staff post (26 Feb 2026) "review times are longer than usual right now, and we apologize for the wait." supported; no duration given, so the guide says Shopify does not publish one.

### What the check changed
- **GitHub**: removed a quoted list of Composio's default GitHub scopes. It was not on the cited page. Moved to "could not verify".
- **ServiceNow**: one source line was a paraphrase of the docs. Replaced with the exact sentence.

### Final status
All remaining quotes in the six reviewed guides are supported by their cited pages (by raw match, rendered match, or a full read of the page). No provider accounts were created; nothing here is from an actual setup attempt.

Note: Google's developer pages return different HTML to scripted fetches on different runs (consent and locale variants), so the raw pass reports 1 to 4 misses for Google depending on the run. The three Google quotes it flags (7-day testing refresh tokens, 100 refresh tokens per account per client ID, security assessment for stored restricted-scope data) were confirmed by reading the pages in full on 2026-10-28. The Composio GitHub "installation link" quote was confirmed the same way.
