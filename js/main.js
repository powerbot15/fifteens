jQuery(function prepareGameField($){

    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].shuffle(),
        cells = $('.cell').draggable({
            helper: 'clone',
            appendTo: 'body',
            zIndex: 100
        });
        
    cells.text(function(i){
        return values[i];
    });

    var stepCount = 0;

    $('.game-field td').droppable({
        drop: function (e, ui) {
            var cell = $(this);

            if (cell.children().length > 0) return;

            ui.draggable.appendTo(this);
            stepCount++;
            checkWin(gameField);
        }
    });

    function checkWin(){
        var win = false;
        $('.cell').each(function(i){
            return win = this.innerHTML == i + 1;
        });
        
        if (! win) return;

        $('.win-inform').text('Yeah, You did it !!! You collected it in ' + stepCount + 'steps');

        currentState.draggable({disabled: true});

    }

    //region =================Utils======================


    function magnetTopLeft(ui){
        ui.draggable.css('top', '0px');
        ui.draggable.css('left', '0px');
    }
    
    
    Array.prototype.shuffle = function(){
        var randomIndex,
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

});
