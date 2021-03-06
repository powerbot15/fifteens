(function(){

    jQuery(function($){
        prepareGameField($);
        $('.refresh-button').on('click', function(){
            $('.win-inform').text('');
            prepareGameField($)
        });
    });

//region =================Utils======================

    function prepareGameField($){

        var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].shuffle(),
            $numberGameElements = $('.number').draggable({zIndex: 100});
        $numberGameElements.draggable({disabled: false});
        for( var i = 0; i < $numberGameElements.length; i++){
            $numberGameElements.eq(i).text(values[i]);
        }

        var stepCount = 0;

        $('body').droppable({
            drop: function(e, ui){
                magnetTopLeft(ui);
            }
        }).disableSelection();

        $('.game-field-cell').droppable({
            drop: function (e, ui) {
                var $numberCell = $(this),
                    distanceX = Math.abs(ui.position.left),
                    distanceY = Math.abs(ui.position.top);

                if (($numberCell.children().length > 0) ||
                    (distanceX > $numberCell.width() * 0.5) && (distanceY > $numberCell.height() * 0.5) ||
                    (distanceX > $numberCell.width() * 1.5) ||
                    (distanceY > $numberCell.height() * 1.5)){
                    magnetTopLeft(ui);
                    return;
                }

                magnetTopLeft(ui);
                ui.draggable.appendTo(this);
                stepCount++;
                checkWin($('.number')); //WTF jQuery objects aren't update themselves automatically
            }
        });

        function checkWin(currentState){

            for (var i = 0; i < currentState.length; i++){
                if (currentState.eq(i).text() != i + 1){return}
            }

            $('.win-inform').text('Yeah, You did it !!! You collected it in ' + stepCount + 'steps');

            currentState.draggable({disabled: true});

        }
    }

    function magnetTopLeft(ui){
        ui.draggable.css('top', '0px');
        ui.draggable.css('left', '0px');
    }

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

        return this;

    };


    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

//endregion

})();
