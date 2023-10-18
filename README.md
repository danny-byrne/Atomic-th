# Vermouth Code Challenge

We are creating a credit card portal, and need your help.
Your task is to take some transaction data in a SQLite database and display it on a front-end UI.

# To start Project

`npm run dev`

will start a development server.

What I did include and why:

- I included the basic functionality as described in the Readme, and also derived functionality based on what the designs suggested, and best practices based on other UX projects I have implemented.
- Filtering mechanics that allowed for a debounced transaction amount input, so the filtering function would only run when the user has stopped typing a number and not every time a new digit is entered.
- Memoizing the transaction filtering based on the inputs, to help scale out in the case that there are many more transactions.

What I didn't include and why:

- Formatted monetary values (ex: $111,111.11) in the filters section and also on the individual transaction cards. I spent some time adding it in the filters section but ended up backtracking and going for a more simple solution. It wasn't specified in the designs, I also figured that noone would filter based on a 'cents' value so I stuck with whole dollar amounts.

What you would add with more time:

- I'm farly new to tailwind css, so I would look into more of the intricacies of that particular library.
- I would also add unit tests to all of my helper functions.
