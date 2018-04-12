//Script loader
function include(url) {

    var sc = document.createElement('script');
    sc.src = url;
    document.head.appendChild(sc);
}

//Include the global variables
include('assets/js/globals.js');

//Includes the shooting mechanics
include('assets/js/shooting.js');

//Includes the collision detection
include('assets/js/collisionDetection.js');

//Includes the game
include('assets/js/game.js');

//Include all the initialisation
include('assets/js/init.js');