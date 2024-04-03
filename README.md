# Day2Day - Hackillinois 2024
## Inspiration
As college students, one of the biggest challenges we faced was budgeting and keeping track of what we should do with our money. Using Excel was our first attempt, but after a few weeks we couldn't keep using it routinely. We wanted to make a faster, automated budgeter to help out students and new grads. Our goal was to answer one question, how much should I be spending and saving everyday to meet my target goal.

## What it does
It connects to your banking account via Plaid. Then, we feed your transactional data as well as user input to an AI model to determine patterns in your expenses, and accordingly suggest how much you should be spending and saving each day of the week. These suggestions are tailored to your spending habits to ensure that you are set up for success for your budgeting journey!

## How we built it
We built it with Next.js in the front-end to make a clean interface that displays easy-to-understand graphics that tell you how much you've spent, have left to spend, and predicts future spending. We had to create a sandbox user with Plaid and inputted a json file containing dummy historical transactions. The historical data would then be used to create the predictive charts.

## Challenges we ran into
Defining the scope of the app and connecting the back-end to the front-end were probably our biggest challenges. We also felt it would be hard to stand out with pre-existing products, but we feel an app with the focus on short-term budgeting for new grads did not immediately come to mind.

## Accomplishments that we're proud of
We're proud of making a good looking front end, getting the connection to Plaid, taking the transactional data and categorizing it and extrapolating an answer for the user with it.

## What we learned
We learned about creating a good looking UI for users as well as connecting Plaid to a web app where we can use the user's transactions.

## What's next for Day2Day
There is a stronger more involved algorithm we could use that could learn over time about the user's spending habits. We could add additional gamification elements

For more information, please refer to the DevPost: https://devpost.com/software/day2day
