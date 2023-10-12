# Vermouth Code Challenge

We are creating a credit card portal, and need your help.
Your task is to take some transaction data in a SQLite database and display it on a front-end UI.

## Getting started

`npm run dev`

will start a development server.

When you load up the application, transactions should be fetched from the /api/transactions endpoint and displayed unstyled on the page.

### Setting up database

The SQLite code (using Sequelize) should setup the database automatically. It will be stored in such a way that the data is only persisted for the current editor session. You should find that the data is reseeded automatically if there is none present in the transactions table.

### Running tests

If you would like to run tests, you can do it via the `npm run test` script.

## Specific Tasks

### Back-end

- The API should be filterable by amount (minimum and maximum), status (pending or settled), the merchant and the card number.

### Front-end

This UI should be implemented according to the designs in this [Figma](https://www.figma.com/file/RcIqSzn7T8uBboGixuWxb5/Vermouth-Code-Challenge-Transactions?type=design&node-id=0-1&mode=design&t=EAifwK56mZzGUSeW-0).

## Time Limit

Please take no longer than 2-3 hours on this assignment. We will discuss the project together afterwards. Should there be incomplete pieces, we will pair through finishing, and we may extend the project.

## What we are looking for

1. For the pieces that are finished, we are looking for a complete solution.
2. Polished product work: the project should be functionally complete, and complete the aims for the end-user.
3. Good clean code and patterns.

If Next JS/TS is not your stack, that's ok. Apply best patterns from what you are familiar with.

## Submission

Please email code-challenge@getzena.com with a link to your forked submission. Feel free to edit this README.md and explain things like:

- what you did include and why
- what you didn't include and why
- what you would add with more time
