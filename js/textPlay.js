
  /*
   * Main variables
   */
  var content = [{
    title: "iOS Developer.",
    desc: "Space Commute, Feeder"
  }, {
    title: "SAP Labs",
    desc: "SAP BI IOs Application. Charting, Push Notifications, Html Viewer, Gestures, Animations"
  }, {
    title: "Iris Recognition",
    desc: "C# EmguCV Daugman's Method, Masek Method"
  }];
  var currentPage = 0;
  //generate content
  for (var i = 0; i < content.length; i++) {
    //split content letters to array
    for (var obj in content[i]) {
      //if string
      if (typeof content[i][obj] === "string") {
        content[i][obj] = content[i][obj].split("");
        continue;
      }
      //if array (grouped text)
      else if (typeof content[i][obj] === "object") {
        var toPush = [];
        for(var j = 0; j < content[i][obj].length; j++) {
          for(var k = 0; k < content[i][obj][j].length; k++) {
            toPush.push(content[i][obj][j][k]);
          }
        }
        content[i][obj] = toPush;
      }
    }
    //set text to 
    $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
    setText();
    //clone to data
    $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
    setText();
  }
  //initial arrangement
  arrangeCurrentPage();
  scrambleOthers();
  /*
   * Event handlers
   */
  $(window).resize(function() {
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-prev").hide();
  $("#soup-prev").click(function() {
    $("#soup-next").show();
    currentPage--;
    if (currentPage === 0) {
      $("#soup-prev").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
    $('#cf').removeClass('animated fadeInRight')
    $('#cf').addClass('animated fadeOutRight')
    setTimeout(animateContainer,1000);
    setTimeout(function(){showImageForPage(currentPage)},1000);
  });
  $("#soup-next").click(function() {
    $("#soup-prev").show();
    currentPage++;
    if (currentPage === content.length - 1) {
      $("#soup-next").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
    $('#cf').removeClass('animated fadeInRight')
    $('#cf').addClass('animated fadeOutRight')
    setTimeout(animateContainer,1000);
    setTimeout(function(){showImageForPage(currentPage)},1000);
    
  });
  /*
   * Functions
   */
   function animateContainer(){
          $('#cf').removeClass('animated fadeOutRight')
      $('#cf').addClass('animated fadeInRight ')
   }
   function showImageForPage(pageNumber){
    if (pageNumber == 0){

      $('#workImage1').attr('src','img/spacegame.jpg')  
      $('#workImage1').removeClass('largerWidthThanParentDiv')
      $('#workImage1').removeClass('smallerWidthThanParentDiv')
      $('#workImage1').addClass('smallerWidthThanParentDiv')


      $('#workImage2').attr('src','img/spacegame2.jpg')  
      $('#workImage2').removeClass('largerWidthThanParentDiv')
      $('#workImage2').removeClass('smallerWidthThanParentDiv')
      $('#workImage2').addClass('smallerWidthThanParentDiv')
      $('#workImage2').css('left','') 

    }
    else if(pageNumber == 1){

      $('#workImage1').attr('src','img/sap1.jpg')
      $('#workImage1').removeClass('largerWidthThanParentDiv')
      $('#workImage1').removeClass('smallerWidthThanParentDiv')
      $('#workImage1').addClass('largerWidthThanParentDiv')

      $('#workImage2').attr('src','img/sap2.png') 
      $('#workImage2').css('left','19.31%') 
      $('#workImage2').removeClass('largerWidthThanParentDiv')
      $('#workImage2').removeClass('smallerWidthThanParentDiv')
      $('#workImage2').addClass('smallerWidthThanParentDiv')



        
    }
    else if(pageNumber == 2){
 
      $('#workImage1').attr('src','img/iris1.jpg')
      $('#workImage1').removeClass('largerWidthThanParentDiv')
      $('#workImage1').removeClass('smallerWidthThanParentDiv')
      $('#workImage1').addClass('largerWidthThanParentDiv')

      $('#workImage2').attr('src','img/iris2.png')
      $('#workImage2').css('left','') 
      $('#workImage2').removeClass('largerWidthThanParentDiv')
      $('#workImage2').removeClass('smallerWidthThanParentDiv')
      $('#workImage2').addClass('largerWidthThanParentDiv') 

    }
   }
  function arrangeCurrentPage() {
    for (var i = 0; i < content[currentPage].title.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
        left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
        top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
         color: "black",
        zIndex: 9001,
             opacity: "1.0"
      });
    }
    for (var i = 0; i < content[currentPage].desc.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
        left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
        top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
        // color: "#111",
        zIndex: 9001,
             opacity: "1.0"
      });
    }
  }

  function setText() {
    var j;
    for (j = 0; j < content[i].title.length; j++) {
      $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
    }
    for (j = 0; j < content[i].desc.length; j++) {
      $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
    }
  }

  function scrambleOthers() {
    for (var i = 0; i < content.length; i++) {
      //don't scramble currentPage
      if (currentPage === i)
        continue;
      var parts = [
        ["title", ".soup-title"],
        ["desc", ".soup-desc"]
      ];
      //apply to .title h1s and .desc ps
      for(var x=1;x<=2;x++){
      for (var j = 0; j < parts.length; j++) {
        for (var k = 0; k < content[i][parts[j][0]].length; k++) {
          //define random position on screen
          var randLeft = Math.floor(Math.random() * $(window).width());
          var randTop = Math.floor(Math.random() * $(window).height());
          //defining boundaries
          var offset = $(".position-data").eq(currentPage).offset();
          var bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top
          };
          var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
          var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
          //finally, apply all the scrambles
          if (j == 0){
           $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
             left: randLeft,
              top: randTop,
               color: "#418082",
             zIndex: "initial",
             opacity: "0.3"
            });
          }
          else{
               $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
             left: randLeft,
              top: randTop,
              // color: "",
             zIndex: "initial",
             opacity: "0.3"
            });


          } 

        }
      }
    }
    }





  }



