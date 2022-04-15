# Project 2 Planning Items
1.
2. Paths: https://docs.google.com/spreadsheets/d/1V-3rQ8EK9T_naGxLEp6kMyjfYPMMk6HcLmbsCCMqprE/edit?usp=sharing
3. ERD: https://lucid.app/lucidchart/8f193df9-76ba-4e0e-ba31-e5d151ffd7a7/edit?invitationId=inv_9bb91e09-9983-4bdf-8bbe-a36026e766da
4. Wireframes: https://drive.google.com/file/d/1CMOXpXXpJHqpsTO2xHqcqyb7IRdWjCHY/view?usp=sharing

![CK_title](https://user-images.githubusercontent.com/2974287/160070860-16a8a86e-9acf-46cb-8d81-286bad957d97.jpeg)

Catcall Karma is a cringe-worthy but lighthearted game about street harassment revenge. 

## Getting Started
How to play:
- Press and hold the SPACEBAR to START and WALK. Travel from your apartment (APT) to the subway without missing the train or losing your mental health.
- If catcalled, your Mental Health will be diminished. Press the "K" key to DELIVER KARMA and launch a grenade at your catcaller for partial restoration of your Mental Health. (Do not kill innocent men!)
- Reach the Subway without losing all of your Mental Health or missing the train, and you win! If Mental Health or Time Remaining reach 0, you lose and the game is over.

Play here: https://rthompson17.github.io/catcaller-game/

## Player Movement and Triggers
![CK_start_apartment](https://user-images.githubusercontent.com/2974287/160070901-1152bd90-869c-48f3-b984-930e4933d350.jpeg)

Player movement is initiated by key code press of the spacebar, then tracked by pixel location. The key code press is part of a function that also begins the timer countdown of the game. Tracking by pixel range and location made it easy to specify exactly where and when a player would be catcalled, as well as when they would be able to use their weapon (aka “deliver karma”). 

## Catcaller Audio
![CK_map](https://user-images.githubusercontent.com/2974287/160070952-ce1d892d-07ba-4a5e-adde-c39b1dc54643.jpg)

Audio clips were created using an AI website’s text-to-speech feature, then triggered to play when a player reached a specific pixel location on the game board. I created an array to store the audio clips to randomly determine whether or not a catcaller would catcall, and determine which audio clip would play as their catcall sound when passed in close range by the player. 

## 'Deliver Karma' Grenade Weapon
![CK_explosion](https://user-images.githubusercontent.com/2974287/160070972-6a99b457-e9a7-4810-8200-4a1099cdaded.jpeg)

I used ‘if’ statements to deduct “mental health” points when a player is catcalled. If the player “delivers karma” to a catcaller, a function adds points back to their mental health status. A player can only deliver karma within close range of the catcaller they passed on the game board, based on pixel location.

## Countdown Timer and endGame Logic
The countdown timer uses functions to track the scenario in which a player might win or lose the game and updates the DOM so that the countdown displays on the screen in real time. 

A player wins the game if they reach the subway, which is located at a specific pixel location on the game board, before the timer reaches zero. A player loses the game if their mental health status reaches zero, or if the counter reaches zero before they reach the subway on the game board.

![CK_loss_time](https://user-images.githubusercontent.com/2974287/160070993-db147df7-2a91-4192-8c5d-fb595f7b609f.jpeg)
![CK_loss_mental_health](https://user-images.githubusercontent.com/2974287/160071002-5ce23e1c-5d82-41ac-9ef2-0bd9d3de78f6.jpeg)
![CK_win](https://user-images.githubusercontent.com/2974287/160071011-c1b06d37-f983-40a3-ab18-efb1a80fe324.jpeg)


## Technologies Used
Catcall Karma was programmed using HTML, CSS and JavaScript.

## Next Steps
- Animated player and catcallers
- Camera movement and zoom to follow the player
- Choice of player outfit before the game starts
- Choice of weapon for the player
- Snazzier CSS overall
- Mobile friendly version
- Text-to-speech responses to catcallers from player input
- More catcall variety, harder levels and paths of travel
- Bigger explosions!

### Attribution:
https://www.freepik.com/vectors/north-america" North america vector created by freepik - www.freepik.com  
https://www.freepik.com/vectors/background' Background vector created by rawpixel.com - www.freepik.com    
https://www.freepik.com/vectors/flat-building' Flat building vector created by vectorpocket - www.freepik.com  
https://www.freepik.com/vectors/abstract' Abstract vector created by macrovector - www.freepik.com
 
 "created with the voices from LOVO @ www.lovo.ai.

