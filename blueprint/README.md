## Intro

### Implementation

This project uses AWS lambda, to use this you will need to include the following files: `.env.development` and
`.env.production`

The token value can be found in this DS:


DS Key: ``

Sample DS Request:

Single row:
https://sorcerer.movableink-templates.com/data_sources/[key]?segment=value

To help with deployment and development we are using [Serverless CLI](https://github.com/serverless/serverless)

## Setup

This is set up to use node 10.13.0 so when using `nvm` do one of the below commands

```
nvm use
```

OR

```
nvm use 10.13.0
```

## To test locally

```
yarn invoke:local
```

## To deploy to AWS

```
yarn deploy:prod
```

## To invoke in AWS

```
yarn invoke:prod
```
