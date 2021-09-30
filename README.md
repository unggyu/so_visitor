# so-visitor
Node.js bot running on a `Github Actions`, that allows you to get `Fanatic` badge in Stack Overflow.

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
In some cases, when the bot accesses the login page on Stack Overflow, it redirects to the recaptcha page.The bot does not have the ability to pass recaptcha, so when accessing the recaptcha page, you may not be able to log in to Stack Overflow. In this case, an error mail is sent to your e-mail, so please log in directly to Stack Overflow when you receive the error mail.