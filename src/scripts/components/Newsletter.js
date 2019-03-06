let $dom = {};

const cacheDom = () => {
  $dom.signupForm = $(".footer-newsletter-form");
};

// Validates form and display error styling on invalid emails.
export const validateForm = function($form) {
  var valid = true;
  var $emails = $form.find('input[type="email"]');
  var $required = $form.find("input[required]");

  if ($emails.length > 0) {
    $emails.each(function(index, field) {
      if (
        $(field)
          .val()
          .indexOf("@") === -1
      ) {
        $(field).css("outline", "1px solid red");
        valid = false;
      }
    });
  }

  if ($required.length > 0) {
    $required.each(function(index, field) {
      if (
        $(field)
          .val()
          .trim() === ""
      ) {
        valid = false;
        console.log($form);
      }
    });
  }

  // if(valid){
  //   $form.find('.promo-bar__input').css("outline","none");
  //   saveCompleteState();
  // }

  return valid;
};

export const success = $form => {
  const promoSuccess = `<p class="signup__copy"><strong class="signup__copy--bold">Thank you! You've successfully subscribed.</strong></p>`;
  $dom.signupForm.replaceWith(promoSuccess);
};

var bindUIActions = function() {
  $dom.signupForm.on("submit", event => {
    const element = $(event.currentTarget); // the specific element that was clicked
    return validateForm(element);
  });
};

export const init = function() {
  cacheDom();
  bindUIActions();
};
