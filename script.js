var background = document.getElementById("background");
var amulet = document.getElementById("cursed-amulet");
var character = document.getElementById("character");
var text = document.getElementById("text");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var failureScreen = document.getElementById("failure");
var failMessage = document.getElementById("failure-message");
var failButton = document.getElementById("fail-button");

//Determines which screen to navigate to on a correct answer
var nextScreen = function(currentScreen) {
    if (currentScreen == 1) {
        setScreen(2);
    } else if (currentScreen == 2) {
        setScreen(3);
    } else if (currentScreen == 3) {
        setScreen(4);
    } else if (currentScreen == 4) {
        youWin();
    }
};

//Set the next screen
var setScreen = function(num) {
    if (num == 1) {
        setImages("images/riverwithpath.jpg", "100%", "100%", "images/cursedamulet.png", "240px", "270px", "40px", "images/man-on-horse.jpg", "310px", "150px", "50px");
    
        var description1 = "You are a fearsome cursed amulet. For millennia you have lain dormant in this river. Now, your time approaches - the king's closest advisor rides near. What do you do?";
        setText(description1, "↠ Whisper ominously into his mind", "↠ Wiggle to catch his attention", "↠ Glimmer seductively", "↠ Nothing");
        
        setOptions(false, false, true, false, "\"THE RIVER'S HAUNTED, RUN AWAYYYY!!!\"", "He thought you were a fish.", "", "He rides by. What did you think would happen?", 1);
    } else if (num == 2) {
        setImages("images/insidecastle.jpg", "100%", "100%", "images/cursedamulet.png", "425px", "175px", "40px", "images/advisor.png", "270px", "70px", "150px");
        
        var description2 = "Success! The advisor spots your alluring gleam and picks you out of the river. Now that he's back at the castle, what will you do?";
        setText(description2, "↠ Convince him you'd be the perfect gift for the king!", "↠ Convince him you'd be the perfect gift for his wife!", "↠ Nothing", "↠ Tell him to overthrow the king");
    
        setOptions(true, false, false, false, "", "Well, now you belong to his wife. Their marriage is thriving, at least.", "Why?", "He realizes your nature and tosses you away. He REALLY likes the king.", 2);
    } else if (num == 3) {
        setImages("images/throne-room.jpg", "100%", "100%", "images/cursedamulet.png", "405px", "165px", "35px", "images/king.png", "320px", "55px", "130px");
        
        var description3 = "The advisor presents you to the king. Finally, finally you're in the hands of someone with power! What will you do to cement your hold on the throne?";
        setText(description3, "↠ Whisper to the king to put you on", "↠ Wait for the king to put you on on his own", "↠ Try to influence him from his hand", "↠ Nothing");
    
        setOptions(false, true, false, false, "He freaks out and drops you. Amulets don't normally talk, dude.", "", "You don't have a strong enough influence. Gotta be around the neck.", "Stop. Just...stop.", 3);
    } else if (num == 4) {
        setImages("images/throne-room.jpg", "100%", "100%", "images/cursedamulet.png", "375px", "90px", "35px", "images/king.png", "320px", "55px", "130px");
        
        var description4 = "The king has finally put you on! Now, to assume full power without being noticed. What's your plan?";
        setText(description4, "↠ Do nothing", "↠ Immediately raise taxes on everyone", "↠ Start killin' politicians", "↠ Slowly change policies until no one can stop you");
    
        setOptions(false, false, false, true, "Little -too- subtle, my guy.", "The peasants have revolted. Enjoy the guillotine!", "Kinda based dude, but the rest of them overthrow you.", "", 4);
    }
};

//Set images/positions on screen according to parameters
var setImages = function(backSrc, backWide, backHigh, amSrc, amX, amY, amWide, charSrc, charX, charY, charWide) {
    background.src = backSrc;
    background.style.width = backWide;
    background.style.height = backHigh;
    
    amulet.src = amSrc;
    amulet.style.right = amX;
    amulet.style.top = amY;
    amulet.style.width = amWide;
    
    character.src = charSrc;
    character.style.left = charX;
    character.style.top = charY;
    character.style.width = charWide;
};

//Sets text for description and options
var setText = function(description, op1, op2, op3, op4) {
    text.textContent = description;
    option1.textContent = op1;
    option2.textContent = op2;
    option3.textContent = op3;
    option4.textContent = op4;
};

//Sets boolean value for options and adds event listeners
var setOptions = function(bool1, bool2, bool3, bool4, fail1, fail2, fail3, fail4, currentScreen) {
    option1.addEventListener("click", function(){optionSelected(bool1, fail1, currentScreen);});
    option2.addEventListener("click", function(){optionSelected(bool2, fail2, currentScreen);});
    option3.addEventListener("click", function(){optionSelected(bool3, fail3, currentScreen);});
    option4.addEventListener("click", function(){optionSelected(bool4, fail4, currentScreen);});
};

//When an option is clicked, determine if it is right or wrong with boolean, and send to next screen accordingly
var optionSelected = function(correct, message, currentScreen) {
    //Removing event listeners from other options so player can only click one at a time
    option1 = replaceSelf(option1);
    option2 = replaceSelf(option2);
    option3 = replaceSelf(option3);
    option4 = replaceSelf(option4);
    
    //Go to next screen (adds back new listeners)
    if (correct == true) {
        nextScreen(currentScreen);
    } else {
        failure(message);
    }
};

//Replaces a node with a clone of itself to remove event listeners, allows more listeners to be added later?
var replaceSelf = function(node) {
    var clone = node.cloneNode(true);
    node.replaceWith(clone);
    
    return clone;
};

//Reset elements to beginning of game on failure (to be called when "Try Again" button is clicked)
var reset = function() {
    setScreen(1);
    
    failureScreen.style.visibility = "hidden";
    
    document.getElementById("main-content").style.backgroundColor = "darkred";
    document.getElementById("failure-caption").textContent = "Whoopsie-Daisy!!";
    failButton.textContent = "Try Again";
        
    background.style.visibility = "visible";
    amulet.style.visibility = "visible";
    character.style.visibility = "visible";
};

//Display failure screen (to be called when player clicks incorrect option)
var failure = function(message) {
    clearContent();
    failMessage.textContent = message;
    failureScreen.style.visibility = "visible";
};

//Clear images from content container
var clearContent = function() {
    background.style.visibility = "hidden";
    amulet.style.visibility = "hidden";
    character.style.visibility = "hidden";
};

//Display winning screen with a button to play again
var youWin = function() {
    clearContent();
    document.getElementById("main-content").style.backgroundColor = "green";
    document.getElementById("failure-caption").textContent = "You Win!!";
    failMessage.textContent = "Definitely not how that works in the real world, nope nuh-uh. But anyway uhhhh...now what?";
    failButton.textContent = "Play Again?";
    failureScreen.style.visibility = "visible";
};

setScreen(1);
failButton.addEventListener("click", reset);