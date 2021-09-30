# so-visitor
Node.js bot running on a Github action, that allows you to get "Fanatic" badge in StackOverflow.

## Requires
1. Github account
2. Mailgun account

## Setup
1. fork this repository
2. Add secrets in repository settings (SO_EMAIL, SO_PASSWORD, MAILGUN_API_KEY, MAIlGUN_DOMAIN)
3. Wait 100 days.
4. Congrats, now you have the Fanatic badge.

## Caution
### Github Actions policy
In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days.
</br>
</br>
For more information, see "[Disabling and enabling a workflow.](https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow)"

### reCAPTCHA