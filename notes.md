# Notes
* debounce clicks on quantity-selector
* use sections to create scope for snippets and prevent snippet reference leakage
* newsletter section with block for each esp form and max-blocks: 1;
* use grid
* update code to remove jquery
  - https://github.com/nefe/You-Dont-Need-jQuery
  - http://youmightnotneedjquery.com/
  - $().closest => el.closest
  - $().find => el.querySelectorAll
* make some of the helper/facade functions chainable
* include facade for super common actions
  - get current quantity
  - get selected variant
* move price containers to control
* make certain handlers their own pubsub event

???
  • upsells
  • gift with purchase
  • back in stock

// initSession
// add
// update
// remove
// updateSession
//   getExperience
//   updateExperience
// redirecToCartAndOrCheckout


# Buddy

* eslint
* stylelint
* automated testing
* uncss
* personal/private pipeline for individual developers
* codeclimate

## Pipelines

* A pipeline is a set of actions, executed by a Git push or by a developer in a specific order that delivers an app or website from a Git repository to wherever a developer wants.

* Industrial production lines vary depending on the nature of the business. In case of software delivery it’s exactly the same – they will be different for every project and every team, depending on the technology and the approach used. However, every pipeline has the same major sections:

* Project
  * Repository
  * Pipeline(s)
    * Action (Build and Integrate)
    * Action (Test)
    * Action (Deploy)

### Example Actions

* Build the application on every push to master branch
* Deliver the application files to server
* Restart the application on server
* Notify you if any of the above actions fails


# Deployments

## Pull Requests:
* happen while merging into _testing_ branch
* are done for all _feature_ branches
* need to figure out exactly how to deal with hotfixes

* autoformatting code with eslint and stylelint?


## Order of Review
* automated testing
* code review
* qa
* client

## Release Branches
* why are they necessary?

> why do the features that are undecided need to hang around in staging? what if we cut new staging and testing branches after every release? and if the client wants to see something that's 3 months old, we just merge the feature branch into the new staging branch again

after deploying a release, run script that sunsets staging and testing branches and cuts new staging and testing branches off of freshly deployed production branch
