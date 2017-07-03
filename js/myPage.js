// $(document).on('click', 'a', function(event){
//     event.preventDefault();

//     $('html, body').animate({
//     	//delay(125);
//         scrollTop: $( $.attr(this, 'href') ).offset().top
//     }, 500);
// });
(function($) {
    $(document).ready(function() {
        $.jScrollability([
            {
                'selector': '.slide-in-demo',
                'start': 'parent',
                'end': 'parent',
                'fn': {
                    'left': {
                        'start': 100,
                        'end': 0,
                        'unit': '%'
                    }
                }
            }
        ]);
    });
})(jQuery);


function displayNavDropDown() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}