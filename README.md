# Bit Koi
[Live Link](https://tyler-chi.github.io/JSProject/)

Simulation of Koi fish swimming in a pond, coded in Canvas/HTML5 and vanilla JavaScript

GIF HERE

## User Interaction

Users are able to click on the pond in order to drop food. Fish accelerate towards the food and 'consume' it.

Users can also press 'F' in order to randomly scatter food in the pond.

In the top left, there are two sliders. Moving the sliders changes the number of fish and lilypads that will be present in the pond.

GIF SLIDING HERE

## Fish Behavior

Fish move around pseudorandomly, meaning there is some degree of consistency with their movement, but also some degree of randomness. Their movement is in part defined by trigonometric functions. The oscillation of their fins and tails are also defined by trigonometric functions.

When food is present in the environment, each fish uses its current position in order to calculate which piece of food is closest to it. Once the fish determines which food particle is closest to it, the fish will change its course and pursue that piece of food. 


## Lilypad Behavior

The lilypads are pretty simple. They have an innate angular rotation, and also float around the pond. They move in straight lines, and bounce off the edges of the pond. Their movement is not affected by anything else in the environment. 