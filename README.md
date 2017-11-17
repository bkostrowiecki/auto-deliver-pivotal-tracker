# pivotal-auto-deliver
Pivotal auto deliver application

## Configuration
You should set pivotal tracker configuration before you start the application.

The configuration should be set as environment variables.

`PIVOTAL_TOKEN`: User's token, you can find it in **Settings** in your Pivotal Tracker profile
`PIVOTAL_PROJECT_ID`: Id of the Pivotal Tracker project that contains tasks which should be autodelivered.

## Nevercode
**Endpoint**: `POST` `/nevercode-hook`

This endpoint waits for request from Nevercode.