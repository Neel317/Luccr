
const topic = document.querySelector('#topic');
const topic1 = document.querySelector('#topic1');
const issues = document.querySelector('#issues');
const issues1 = document.querySelector('#issues1');
const issues2 = document.querySelector('#issues2');
const issues3 = document.querySelector('#issues3');
// const exposure = document.querySelector('#exposure');
// const severity = document.querySelector('#severity');
// const susceptibility = document.querySelector('#susceptibility');
// const check21 = document.querySelector('#check2.1');
// const check22 = document.querySelector('#check2.2');
// const check23 = document.querySelector('#check2.3');
// const check24 = document.querySelector('#check2.4');
// const check25 = document.querySelector('#check2.5');

function validateInputs(){
    if(!topic.value.length){
        return {element: topic, complete: false};
    } 
    // else if(!topic1.value.length){
    //     return {element: topic1, complete: false};
    // } 
    // else if(!issues.value.length){
    //     return {element: issues, complete: false};
    // }
    // else if(!issues1.value.length){
    //     return {element: issues1, complete: false};
    // }
    // else if(!issues2.value.length){
    //     return {element: issues2, complete: false};
    // }
    // else if(!issues3.value.length){
    //     return {element: issues3, complete: false};
    // }
    // else if(!exposure.value.length){
    //     return {element: exposure, complete: false};
    // }
    // else if(!severity.value.length){
    //     return {element: severity, complete: false};
    // }
    // else if(!susceptibility.value.length){
    //     return {element: susceptibility, complete: false};
    // }
    // else if(!check21.checked || !check22.checked || !check23.checked || !check24.checked || !check25.checked){
    //     return {element: null, complete: false};
    // }
    else {
        return {element: null, complete: true};
    }
}


;(function($) {
  "use strict";  
  
  //* Form js
  function verificationForm(){
      //jQuery time
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches

      $(".next").click(function () {
          

          const inputChecks = validateInputs()
          if(inputChecks.complete){
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale current_fs down to 80%
                    scale = 1 - (1 - now) * 0.2;
                    //2. bring next_fs from the right(50%)
                    left = (now * 50) + "%";
                    //3. increase opacity of next_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')',
                    });
                    next_fs.css({
                        'left': left,
                        'height': 'auto',
                        'opacity': opacity
                    });
                },
                duration: 600,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            if(inputChecks.element){
                inputChecks.element.focus();
            }
          }
      });

      $(".previous").click(function () {
          if (animating) return false;
          animating = true;

          current_fs = $(this).parent();
          previous_fs = $(this).parent().prev();

          //de-activate current step on progressbar
          $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

          //show the previous fieldset
          previous_fs.show();
          //hide the current fieldset with style
          current_fs.animate({
              opacity: 0
          }, {
              step: function (now, mx) {
                  //as the opacity of current_fs reduces to 0 - stored in "now"
                  //1. scale previous_fs from 80% to 100%
                  scale = 0.8 + (1 - now) * 0.2;
                  //2. take current_fs to the right(50%) - from 0%
                  left = ((1 - now) * 50) + "%";
                  //3. increase opacity of previous_fs to 1 as it moves in
                  opacity = 1 - now;
                  current_fs.css({
                      'left': left,
                  });
                  previous_fs.css({
                      'transform': 'scale(' + scale + ')',
                      'opacity': opacity
                  });
              },
              duration: 600,
              complete: function () {
                  current_fs.hide();
                  animating = false;
              },
              //this comes from the custom easing plugin
              easing: 'easeInOutBack'
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      $(".submit").click(function () {
          return false;
      })
  }; 
  
  //* Add Phone no select
  function phoneNoselect(){
      if ( $('#msform').length ){   
          $("#phone").intlTelInput(); 
          $("#phone").intlTelInput("setNumber", "+880"); 
      };
  }; 
  //* Select js
  function nice_Select(){
      if ( $('.product_select').length ){ 
          $('select').niceSelect();
      };
  }; 
  /*Function Calls*/  
  verificationForm ();
  phoneNoselect ();
  nice_Select ();
})(jQuery);
