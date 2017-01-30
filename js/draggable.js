$(document).ready(function(){

var box = $('.corpo');


var drag = {
    elem: null,
    x: 0,
    y: 0,
    state: false
};
var delta = {
    x: 0,
    y: 0
};

box.mousedown(function(e) {
    if (!drag.state) {
        drag.elem = this;
        drag.x = e.pageX;
        drag.state = true;
    }
    return false;
});


$(document).mousemove(function(e) {
    if (drag.state) {

        delta.x = e.pageX - drag.x;


        var cur_offset = $(drag.elem).offset();

        $(drag.elem).offset({
            left: (cur_offset.left + delta.x),
        });

        drag.x = e.pageX;
    }
});

$(document).mouseup(function() {
    if (drag.state) {
        drag.state = false;
    }
});
});
