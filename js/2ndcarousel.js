    // $(document).ready(function(){
    //     // Activate Carousel
    //     $("#postsCarousel").carousel();

    //     //Move the slides
    //     $('.fa-chevron-left').click(function(){ 
    //         $('#postsCarousel').carousel('prev');
    //     });
        
    //     $('.fa-chevron-right').click(function(){ 
    //         $('#postsCarousel').carousel('next');
    //     });
    // });
    
    $('.carousel-prev').click(function(){ 
        console.log("atrás: ",$('#postsCarousel').carousel('prev'));
    });
    // $('.fa-chevron-left').click(function(){ 
    //             $('#postsCarousel').carousel('prev');
    //         });