$(document).ready(function () {
/* GALLERY SCRIPT */

  /* TODO
  CHANGE THE VARIABLES TO YOUR RELEVANT FOLDER PATH / FILE EXTENSION
  */
  var filetype = '.png';
  var filepath = 'images/screenshots/';
  var filefolder = ['StarWars/', 'Hawks/', 'yourfolderhere/', 'Tigers/', 'Food/', 'yourfolderhere/'];
  var clickCount = 0;
  /* TODO
  INPUT HOW MANY FILES ARE IN THE FOLDER, I.E folder 'star/' has 4 images
  */
  var filecount = [4, 6, 0, 6, 5, 0]; // TODO corresponding file count HERE
  var fileNum = 1;

  function getGallery(ftype, fpath, folder, folderNum){
      $(".thumbContainer").empty();
      $(".selectedImg").empty();
      for (var i = 1; i <= folderNum; i++){
        $('<img />', {
          class: 'imgThumb',
          src: fpath + folder + i.toString() + ftype
        }).appendTo(".thumbContainer");
      };
      $('<img />', {
        class: 'mainImg',
        src: fpath + folder + '1' + ftype
      }).appendTo(".selectedImg");
  }

  /* TODO
  ADD / REMOVE A CASE FOR EVERY FOLDER YOU HAVE, GIVE THE FILEFOLDER AND FILENUM INDEX RELEVANT
  */
  function switchGallery(btn) {
    switch (btn){
      case 'StarWars': getGallery(filetype, filepath, filefolder[0], filecount[0])
                      break;
      case 'hHawks': getGallery(filetype, filepath, filefolder[1], filecount[1])
                      break;
      case 'yourIDhere':       getGallery(filetype, filepath, filefolder[2], filecount[2])
                      break;
      case 'tTigers':  getGallery(filetype, filepath, filefolder[3], filecount[3])
                      break;
      case 'fFood': getGallery(filetype, filepath, filefolder[4], filecount[4])
                      break;
      case 'yourIDhere': getGallery(filetype, filepath, filefolder[5], filecount[5])
                      break;
    }
  }



/* GALLERY EVENTS SCRIPT */


  function galleryEvents() {
    $(".thumbContainer img").on({
      mouseover: function () {
        $(this).css({
          'cursor': 'pointer',
          'border-color': '#7f1a1c',
          'transition' : '.7s'
        });

      },
      mouseout: function () {
        $(this).css({
          'cursor': 'default',
          'border-color' : 'grey'
        });
      },
      click : function () {
          var imageUrl = $(this).attr('src');
          console.log($('.mainImg'));
          $('.mainImg').removeAttr("id");
          console.log($('.mainImg'));
          $('.mainImg').fadeOut(1000, function () {
            $(this).attr('id', 'selected');
            $(this).attr('src', imageUrl);
            console.log($(this));
          }).fadeIn(1000);
        }
    });
  }
  /* GALLERY OPEN AND CLOSE SCRIPT */

    function closeWindow(e) {
      $('.black_overlay').slideFadeToggle(function() {
        e.removeClass('opened');
      });
    }

    $(function() {
      $('.gallery').on('click', function() {
          switchGallery(this.id);
          galleryEvents();
          $('closeBtn').addClass('opened');
          $('.black_overlay').slideFadeToggle();
      });
      $('.closeBtn').on('click', function() {
        clickCount = 0;
        closeWindow($('.gallery'));
        return false;
      });
    });

    $.fn.slideFadeToggle = function(easing, callback) {
      return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
    }

/* CAROUSEL */

    $(".nextarrow:last-of-type").click(function() {

      clickCount += 1;
      var cycleNum = 1;
      var $selected = $("#selected").removeAttr("id");
      var cycleImgs = $('.thumbContainer').children();
      console.log(cycleImgs);
      if (clickCount == 1)cycleNum = 2;
      var currentImg = cycleImgs.eq((cycleImgs.index($selected) + cycleNum) % cycleImgs.length).attr('id', 'selected');
      var cycledUrl = currentImg.attr('src');
      console.log(cycledUrl);
      $('.mainImg').fadeOut(1000, function () {
        $(this).attr('src', cycledUrl);
      }).fadeIn(1000);
    });

    $(".nextarrow:first-of-type").click(function() {

      clickCount += 1;
      var cycleNum = 1;
      var $selected = $("#selected").removeAttr("id");
      var cycleImgs = $('.thumbContainer').children();
      console.log(cycleImgs);
      if (clickCount == 1)cycleNum = 0;
      var currentImg = cycleImgs.eq((cycleImgs.index($selected) - cycleNum) % cycleImgs.length).attr('id', 'selected');
      var cycledUrl = currentImg.attr('src');
      console.log(cycledUrl);
      $('.mainImg').fadeOut(1000, function () {
        $(this).attr('src', cycledUrl);
      }).fadeIn(1000);
    });


});
