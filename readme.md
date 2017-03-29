# Project 3
Ben Currie
Fabricio Ferreira
Sam Wakefield
Roman Stankiewicz

# Accumulator App

### GA WDI London - Project 3 - Team Project

#### An application for obtaining core betting data to build accumulators using odds which can be reviewed in real time.

The site is designed to enable a pundit to obtain information on events by category and date, and build an accumulator bet with the data.  The API used is prvided from Betfair.

XXX

##### [Link to App](https://powerful-mountain-XXXXX.herokuapp.com/)

#### Home Screen

The welcome screen shows XXX.  From this page, users must either login and authenticate by registering through the app directly or via Facebook.

<!-- //Check this -->
Facebook users are re-directed to the profile page upon initial login, to complete their user profile.  This ensures consistency of the user journey and experience.
Subsequent logins via Facebook will not require this additional step.

#### Profile page

XXX

<!-- ![](./src/assets/images/CR_UserIndex.png) INSERT IMAGES HERE -->

Clicking on a username will re-direct to the individual profile page.  Here, you will find further user information which includes:

* xx
* username
* xxx
* xxx

Users are able to edit or delete their own profile only and can do so by accessing their details at 'My Profile'

#### Profile Page - Create an Accumulator

xxx

#### View Accumulator

xxx

#### Approach / How It Works

This is a full stack application which utilises RESTful routing and authentication.

Secure routes ensure that only registered users can access the site.

##### APIs used

1. Betfair Betting API

#### The Build

The following tools are used to build the site.

* Javascript
* AngularJS
* Bootstrap SCSS
* MongoDB

In addition, the following planning and management tools were used:

* Trello for project management
* Balsamiq for the wireframing (although this evolved during the build)

![](./src/images/P3_BalsamiqAll.png)

#### Problems & Challenges

The greatest challenges were:

1. accessing the API as session tokens kept expiring

#### Wins

1. understanding the complex Betfair API documentation to access the data required
