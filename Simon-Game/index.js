var started = false;
var level= 0;
var userClickedPattern=[];
var gamePattern=[];
var buttonColors =["red","blue","green","yellow"];
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").html("Level "+ level);
    //level++;
     var randomNumber = Math.floor(Math.random()*4);
     var randomChosenColor=buttonColors[randomNumber];
     gamePattern.push(randomChosenColor);
     $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColor);
}
$(".btn").click(function(){
    userChosenColor = this.id;
    // $("#"+userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //var buttonClicked = console.log(event.key);
    userClickedPattern.push(this.id);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
            // $(".btn").click(function (event) {
            //     $target = $(event.target);
            //        $target.addClass('pressed');
            //        setTimeout(function(){
            //            $target.removeClass('pressed');
            //        },100);
            //    });

}
$(document).keypress(function(){
    if( !started ){
        $("h1").html("Level "+ level);
        nextSequence();
        started = true;

    }
        
});

// $(document).on('click', function (event) {
//     $target = $(event.target);   
//        $target.addClass('widget-selected');
//    });
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
            
    }
        
    else{
        console.log("Fail");
        $("h1").html("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();

    }  
}
function startOver(){
    level=0;
    started=false;
    gamePattern=[];

}