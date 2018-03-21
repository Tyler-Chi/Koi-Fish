# Bit Koi

## [Live Link](https://tyler-chi.github.io/Koi-Fish/)

Simulation of Koi fish swimming in a pond, coded in Canvas/HTML5 and Vanilla JavaScript

![](https://github.com/Tyler-Chi/JSProject/blob/master/javascript_files/fishy3.gif)

## User Interaction

Users are able to click on the pond in order to drop food. Fish accelerate towards the food and 'consume' it.

Users can also press 'F' in order to randomly scatter food in the pond.

Moving the sliders dynamically updates the number of fish and lilypads that will be present in the pond.

## Fish Behavior

Fish move around pseudorandomly, meaning there is some degree of consistency with their movement, but also some degree of randomness. Their movement is in part defined by trigonometric functions. The oscillation of their fins and tails are also defined by trigonometric functions.

Drawing the fish relies upon basic calculus, taking into account the current position of the fish, as well as its past movement vectors.

When food is present in the environment, each fish uses its current position in order to calculate which piece of food is closest to it. Once the fish determines which food particle is closest to it, the fish will change its course and pursue that piece of food. 


## Lilypad Behavior

The Lilypads have an innate angular rotation, and also float around the pond. They move in straight lines, and bounce off the edges of the pond. Their movement is not affected by anything else in the environment.

## Future Ideas

I want the fish to be somehow affected by other fish in their environment. Koi fish generally swim near the surface when chasing food, so fish shouldn't be able to stack on top of each other as easily as they do now.

I want the lilypads movement to be somehow affected by the movement of nearby fish, as if the movement of the fish created a current in the water.
