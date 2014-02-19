
jQuery(function($){

    prepareGameField();

    $('body').droppable({
        drop: function(e, ui){
            ui.draggable.css('top', '0px');
            ui.draggable.css('left', '0px');
        }
    });

    $('.game-field td').droppable({
        drop: function (e, ui) {
            var numberCell = $(this),
                distanceX = Math.abs(ui.position.left),
                distanceY = Math.abs(ui.position.top);

            if ((numberCell.children().length > 0) ||
                (distanceX > numberCell.width()*0.5) && (distanceY > numberCell.height()*0.5) ||
                (distanceX > numberCell.width()*1.5) ||
                (distanceY > numberCell.height()*1.5)){
                magnetTopLeft(ui);
                return;
            }
            magnetTopLeft(ui);
            ui.draggable.appendTo(this);
            checkWin();
        }
    }).disableSelection();

    $('.game-field td>div').draggable({zIndex: 100}).disableSelection();

    function prepareGameField(){
        var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            gameField = $('.game-field td>div');

        values = values.shuffle();
        for( var i = 0; i < gameField.length; i++){
            console.log(gameField.eq(i).text());
            gameField.eq(i).text(values[i]);

        }
    }
    function checkWin(){

        var currentState = $('.game-field td>div');

        for (var i = 0; i < currentState.length; i++){
            if (currentState.eq(i).text() != i+1){return}
        }

        $('.win-inform').text('Yeah, You did it !!!');

        currentState.draggable({disabled: true});

    }

});
//region =================Utils======================
function magnetTopLeft(ui){

    ui.draggable.css('top', '0px');
    ui.draggable.css('left', '0px');


}
(function setShuffleMethod(){
    Array.prototype.shuffle = function(){

        var
            randomIndex,
            exchangeVar,
            countOfElements = this.length;

        for(var i = 0; i < countOfElements; i++){
            randomIndex = getRandomInt(0, countOfElements - 1);
            exchangeVar = this[randomIndex];
            this[randomIndex] = this[i];
            this[i] = exchangeVar;
        }

        this.localData = undefined;
        return this;
    };

})();

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//endregion
