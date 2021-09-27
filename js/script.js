$(document).ready(function(){

    //"JavaScript is Enabled" Body Class
    $("body").addClass("js");

    // Gallery (Lightbox + Carousel)
    var $currentImage;
    var $galleryImages = $('.gallery .card-img');
    $galleryImages.on('click', function(e){
        $currentImage = $(this);
        var imgUrl = $currentImage.data('lightbox-image-url');
        $('#lightbox').css({backgroundImage: 'url(' + imgUrl + ')'});
        $('#lightbox-overlay').css({display: 'flex'});
    });

    $('.lightbox-control').on('click', function(e){
        var $this = $(this);
        var $parent = $currentImage.parent();
        var $image;

        if($this.is('.left-arrow')){
            $image = $parent.prev();
        }else{
            $image = $parent.next();
        }

        if($image.length > 0){
            $currentImage = $image.find('.card-img');
            var imgUrl = $currentImage.data('lightbox-image-url');
            $('#lightbox').css({backgroundImage: 'url(' + imgUrl + ')'});
        }
    });

    $("#lightbox-close-btn").on('click', function(e){
        $('#lightbox-overlay').hide();
    });


    // Form Validation

    // Removes red border and error message when user interacts with them again
   $("input").on('change', function (event){
        var $this = $(this);
        var inputErrorMessage = $(".input-error-message");
        
        if ($this.val() !== "") {
            if ($this.prop('type') === "radio") {
                $this.parent().removeClass("input-error-border");
                $this.parent().prev(inputErrorMessage).hide();
            }else{
                $this.removeClass("input-error-border");
                $this.prev("p").remove();
            }
        }
    });
    
    // Prevents form from submitting if certain input fields are empty 

    $("#booking-form").submit(function(event){
        var firstName = $("#f-name");
        var lastName = $("#l-name");
        var email = $("#email");
        var phoneNum = $("#p-number");
        var specialDiet = $("input[name='dietry-needs']");

        var addError = function(elem){
            elem.addClass("input-error-border");
            elem.prev('.input-error-message').show();
        };

        // Adds red border and error message for empty input fields

        complete = false;
        errorCount = 0;
        if (firstName.val() === "") {
            errorCount++;
            addError(firstName);
        }

        if (lastName.val() === "") {
            errorCount++;
            addError(lastName);
        }

        if (email.val() === "") {
            errorCount++;
            addError(email);
        }

        if (phoneNum.val() === "") {
            errorCount++;
            addError(phoneNum);
        }

        if (!specialDiet.is(":checked")) {
            errorCount++;
            addError(specialDiet.parent());
        }

        if(errorCount === 0){
            $('#submit-btn').css({backgroundColor: 'green', pointer: 'default'})
                            .val('SUBMITTED')
                            .attr('disabled', true); 
        }

        event.preventDefault();
    });

    // Fun Facts Section

    var funFacts = [
        "Mars is named after the Roman God of War.", 
        "Mars has frozen water and may have once had oceans.", 
        "Mars has two moons called Phobos and Demios.", 
        "The Viking Landers were the first spacecraft to land on Mars. The first landed in 1976.",
        "Since Martian gravity is only a third that of Earth's, you can jump 3 times higher on Mars.",
        "Mars is a little slower, and farther from the sun, so a full circuit takes 687 Earth days - or one Mars year.",
        "Days on mars are 25 hours long, making them 1hr longer than Earth days.",
        "The first telescopic observation of Mars was by Galileo Galilei in 1610.",
        "Using revolutionary modular technology, Martian Splendour Resort was built in only 5 years.",
        "Mars has the solar system's tallest volcano, Olympus Mons, which stands almost three times taller than Mount Everest.",
        "It would take more than 6 of Mars to fill the volume of the Earth",
        "Mars is the fourth planet from the sun",
    ];

    // Makes 'Next Fact' button appear only if javascript is enabled
    $('#next-fact-btn').css({display: 'inline-block'});
    
    function setFunFact(event) {
        var funFactIndex = Math.floor(Math.random() * funFacts.length - 1);
        $("#fun-fact").text(funFacts[funFactIndex]);
        if (event) {
            event.preventDefault();
        }
    }

    // Ensures that a new fact is randomly set each time the homepage is reloaded
    setFunFact();

    // Randomly sets a new fact when users click the 'Next fact' button
    $('#next-fact-btn').on('click', setFunFact);

});