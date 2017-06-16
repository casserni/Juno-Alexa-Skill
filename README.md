
## Juno - Version Alexa
This skill offers current exchange rates as compared to the US Dollar!
Currently supports over 30 different foreign currencies. The exchange rates are supplied by the Central European Bank and are updated once daily. When asking for an exchange rates use words like "compare" or "exchange". This skill also supported the currency abbreviations like CAD for the Canadian Dollar. If asking for the exchange rate and using the formal title, please state the entire name usually starting with the country of origin, example being British Pound Sterling not just Pound. If you are ever unsure of which currencies are supported simply ask to list all the currencies or more specifically ask if one is supported!

#### "Alexa, ask Juno"
  * Tell me all the currencies
  * Rate for EUR
  * Do you support the Croatian Kuna


![alt text](https://github.com/casserni/Juno-Alexa-Skill/raw/master/common/images/betterbots.png "betterbotsimage")

This skill can use an uTu middleware to send message and intent information
to the uTu console for later analyzing. Used uTu's betterbots-botkit repo and video tutorial as a template.
  * Betterbots-Botkit Repo: [https://github.com/utu-ai/betterbots-botkit]
  * Video Tutorial: [https://docs.utu.ai/bot-anatomy-101/]

## Alexa Configuration
![alt text](https://github.com/casserni/Juno-Alexa-Skill/raw/master/common/images/alexa.png "alexaimage")

#### Skill Information
  * Name: US Dollar Exchange - Juno
  * Invocation Name: Juno

#### Interaction Model
See the folder `Alexa Interaction Model` in `Common` for more Information

#### Configuration
  * Service Endpoint Type: https
  * Webhook: https://{SOMEHEROKU}.herokuapp.com/alexa/recieve
  * Hosted on Heroku
  * Account Linking: No

#### SSL Certification
  *  My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority (Property of Heroku)
