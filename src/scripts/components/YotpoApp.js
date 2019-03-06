/* Dependencies:
   * yotpoApp window variable
   *
   * window.yotpoApp = {
   *   "productId": "{{ product.id }}",
   *   "shopUrl": "{{ shop.url }}",
   *   "reviewsEntryPoint": ".reviews-entry-point",
   *   "questionsEntryPoint": ".questions-entry-point",
   *   "avgRatingEntryPoint": ".avg-review-stars",
   *   "herokuAppName": "sample-client-app"
   * };
   */

var productId;
var shopUrl;
var appURL;
var $reviewsEntryPoint;
var $questionsEntryPoint;
var $avgReviewStars;
var totalReviews;
var totalQuestions;
var totalAnswers;
var avgScore;
var sliderOptions = {
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  dots: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }
  ]
};

var yotpoVariables = function() {
  productId = window.yotpoApp.productId;
  shopUrl = window.yotpoApp.shopUrl;
  appURL = `//${window.yotpoApp.herokuAppName}.herokuapp.com`;
  $reviewsEntryPoint = $(window.yotpoApp.reviewsEntryPoint);
  $avgReviewStars = $(window.yotpoApp.avgRatingEntryPoint);
};

var buildReview = function(review, productID) {
  /* Define custom html view for a single review
     * Specific-Product Fields:
     ** content, title, verified_buyer, votes_up, votes_down, created_at, id, productId, score, custom_fields, source_review_id
     ** user.display_name, user.is_social_connected, user.social_image, user.user_id, user.user_type
     * --------------------------------------------------------------------------------------------
     * All-Products Fields:
     ** content, title, created_at, deleted, email, id, name, reviewer_type, score, sku, votes_up, votes_down
     */

  /* Init review variables */
  var title = review.title;
  var content = review.content;
  var score = review.score;
  var votesUp = review.votes_up;
  var votesDown = review.votes_down;
  var reviewID = review.id;
  var reviewDate = review.created_at;
  var userName = "";
  var userID = "";
  var userImage = "";
  var userType = "";
  var userSocialConnected = "";
  var verifiedBuyer = "";
  var userEmail = "";
  var customFields = "";
  var sourceReviewID = "";

  /* Date formatting */
  var stringDate = reviewDate;
  var newReviewDate = new Date(stringDate);
  var formatDate = `${newReviewDate.getMonth() +
    1}/${newReviewDate.getDate()}/${newReviewDate.getFullYear()}`;

  /* Init review variables dependent on product ID */
  if (productID != "") {
    userName = review.user.display_name;
    userID = review.user.user_id;
    /* userImage = review.user.social_image; */
    userType = review.user.user_type;
    userSocialConnected = review.user.is_social_connected;
    customFields = review.custom_fields;
    sourceReviewID = review.source_review_id;
    verifiedBuyer = review.verified_buyer;
  } else {
    userName = review.name;
    userEmail = review.email;
    userType = review.reviewer_type;
  }

  /* Truncate reviewer name to 2 words max */
  var reviewerName = userName
    .split(" ")
    .splice(0, 2)
    .join(" ");

  /* Set user type */
  var verifiedUserType = "";
  if (verifiedBuyer == true && userSocialConnected == 0) {
    verifiedUserType = "Verified Buyer";
  } else if (verifiedBuyer == false && userSocialConnected == 1) {
    verifiedUserType = "Verified Reviewer";
  } else {
    verifiedUserType = "";
  }

  /* Build review stars - font awesome */
  var reviewStars = '<span class="start-wrap">';
  for (i = 0; i < score; i++) {
    reviewStars += '<i class="fa fa-star"></i>';
  }
  reviewStars += "</span>";

  /* String formatting for share URLs */
  var shareContent = content.replace(/ /g, "%20");
  var shareTitle = title.replace(/ /g, "%20");
  var shareUrl = window.location.href.replace("http:", "http%3A");

  /* Html array string */
  // prettier-ignore
  var html = [
      '<div class="review-padding">',
        '<div class="review product-review-content-container" data-review-id="', reviewID, '">',
          '<div class="review-user-review-container">',
            '<div class="review-user" data-user-id="', userID, '" data-verified-user="', verifiedBuyer, '">',
              '<p class="review-user-container">',
                reviewerName,
              '</p>',
              '<p class="review-date">',
                formatDate,
              '</p>',
            '</div>',
          '</div>',
          '<div class="review-stars-date-title-container">',
            '<div class="review-stars">',
              reviewStars,
            '</div>',
            '<div class="review-content">',
              content,
            '</div>',
          '</div>',
          '<div class="share-vote-container">',
            '<div class="review-sharing">',
              '<div class="share-links flex">',
                '<a class="facebook review-share-link" href="https://www.facebook.com/sharer/sharer.php?u=', shareUrl, '"><i class="fa fa-facebook"></i></a>',
                '<a class="twitter review-share-link" href="//twitter.com/home?status=', shareContent, shareUrl, '"><i class="fa fa-twitter"></i></a>',
                '<a class="linked-in review-share-link" href="https://www.linkedin.com/shareArticle?mini=true&url=', shareUrl, '&title=', shareTitle, '&summary=', shareContent, '&source="><i class="fa fa-linkedin-square"></i></a>',
              '</div>',
              '<div class="share-link-toggle">',
                '<i class="fa fa-share-square-o"></i> <span class="share-link-toggle-text">Share</span>',
              '</div>',
            '</div>',
            '<div class="review-votes" data-id="', reviewID, '">Was This Review Helpful?  &nbsp;<span class="vote vote-up" data-vote-type="up" data-vote-for="reviews"><i class="fa fa-thumbs-up" aria-hidden="true"></i> <span class="vote-number">', votesUp, '</span></span> <span class="vote vote-down" data-vote-type="down" data-vote-for="reviews"><i class="fa fa-thumbs-down" aria-hidden="true"></i> <span class="vote-number">', votesDown, '</span></span></div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

  $reviewsEntryPoint.append(html);
};

/* Calculating half stars for total average star rating and inserting to avgReviewsStar entry point */
var buildAVGRatings = function(avgScore) {
  var avgScoreInt = Math.floor(avgScore);
  var totalScore = "";
  for (i = 0; i < avgScoreInt; i++) {
    totalScore += '<i class="fa fa-star"></i>';
  }
  avgScoreDec = avgScore % 1;
  if (avgScoreDec < 0.25) {
    totalScore = totalScore;
  } else if (avgScoreDec > 0.249 && avgScoreDec < 0.75) {
    totalScore += '<i class="fa fa-star-half"></i>';
  } else if (avgScoreDec > 0.749) {
    totalScore += '<i class="fa fa-star"></i>';
  }

  if (avgScore === 0) {
    totalScore +=
      '<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
  }

  $avgReviewStars.html(totalScore);
  $(".reviews-avg-dec").html(avgScore.toFixed(1));
};

var postNewReview = function(form) {
  var formData = $(form).serialize();
  yotpoCreateReviewURI = `${appURL}/yotpo-add?${formData}`;
  var writeReviewRequest = $.get(yotpoCreateReviewURI)
    /* On Fail, log error */
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("Failed to post");
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    })
    /* On Success, check one extra error, then close review form and send thank you message */
    .done(function(data) {
      if (data.hasOwnProperty("error_type")) {
        alert(
          `ERROR: Could not post your review\nError Code: ${
            data.code
          }\nMessage: ${data.message}\nPlease fix the errors and try again.`
        );
      } else {
        $(".write-review-form").toggleClass("is-visible");
        $(".write-review").text("Thanks for your Review!");
      }
    });
};

var sendReviewsRequest = function() {
  var reviewRequestURL = `${appURL}/yotpo-fetch?shop=${shopUrl}&pid=${productId}`;

  console.log({ reviewRequestURL });

  var appRequest = $.get(reviewRequestURL)
    /* On fail, log and send error */
    .fail(function(error) {
      console.log("Fail");
      console.log(error);
    })
    /* On success,
       * log (reviews) data object and set the reviews array accordingly
       * loop through the reviewsArray and build each review
       * Finally, display the reviews area
       */
    .done(function(data) {
      // console.log(data);
      var reviewsArray = [];
      totalReviews = data.response.bottomline.total_review;
      avgScore = data.response.bottomline.average_score;
      if (productId == "") {
        reviewsArray = data.reviews;
      } else {
        reviewsArray = data.response.reviews;
      }
      var html = "";
      reviewsArray.forEach(function(review, index) {
        html += buildReview(review, productId);
      });
      /* Append review node to the reviewsEntrPoint */
      $(".num-reviews").text(totalReviews);
      if (totalReviews === 1) {
        $(".num-reviews-title").text("Review");
        $(".num-reviews-bottom-title").text("They Said it Best");
      }
      if (totalReviews === 0) {
        // $('.num-reviews').remove(totalReviews);
        $(".num-reviews-title").text("No Reviews");
        $(".num-reviews-bottom-title").text("No Customer Reviews");
      }
      if (totalReviews > 1) {
        $(".num-reviews-title").text("Reviews");
        $(".num-reviews-bottom-title").text("They Said it Best");
      }

      $reviewsEntryPoint.show();
    })
    /* After fail or success,
       * init slider? show animation? bind new actions?...
       * Populate the average rating field
       */
    .always(function() {
      $reviewsEntryPoint.slick(sliderOptions);
      buildAVGRatings(avgScore);
    });
};

var bindUIActions = function() {
  /* Review Voting */
  $(document).on("click", ".vote", function() {
    var $this = $(this);
    var voteType = $this.attr("data-vote-type"); // 'Up' or 'Down'
    var voteID = $this.parent().attr("data-id"); // Review or Answer id
    var voteFor = $this.attr("data-vote-for"); // 'Reviews' or 'Answers'
    var yotpoVoteURI = `//api.yotpo.com/${voteFor}/${voteID}/vote/${voteType}`;
    var voteRequest = $.get(yotpoVoteURI)
      /* Fail function */
      .fail(function(error) {
        console.log(error);
        alert(error);
      })
      /* Success function */
      .done(function(data) {
        $this.parent().addClass(`voting-complete voting-${voteType}`);
        var votes =
          parseInt(
            $this
              .find(".vote-number")
              .text()
              .trim()
          ) + 1;

        $this.find(".vote-number").text(votes);
      });
  });
  /* Write a review - Score Stars */
  /* Click start */
  $(document).on("click", ".star-score-wrap .star-score", function() {
    var newScore = $(this).attr("data-score");
    $("#review_score").val(newScore);
    $(".star-score i")
      .removeClass("fa-star")
      .addClass("fa-star-o");
    for (i = 1; i <= newScore; i++) {
      $(`.star-score[data-score="${i}"]`)
        .find("i")
        .removeClass("fa-star-o")
        .addClass("fa-star");
    }
  });
  /* Share link click */
  $(document).on("click", ".share-link-toggle", function() {
    if (
      $(this)
        .closest(".review-sharing")
        .hasClass("active")
    ) {
      $(this)
        .closest(".review-sharing")
        .removeClass("active");
    } else {
      $(this)
        .closest(".review-sharing")
        .addClass("active");
    }
  });
  /* Grab Form Values and Send App Request */
  $(document).on("submit", "#writeReview", function(e) {
    e.preventDefault();
    postNewReview(this);
  });
  /* Open share link in new window */
  $(document).on("click", ".review-share-link", function() {
    var currentHref = $(this).attr("href");
    window.open(
      currentHref,
      "_blank",
      "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=400",
      false
    );
    return false;
  });
  /* Click write-review and toggle review form */
  $(".js-write-review").on("click", function() {
    $(this)
      .next()
      .toggleClass("is-visible");
  });

  $(".close-review-form").on("click", function() {
    $(".write-review-form").toggleClass("is-visible");
  });
};

export const init = function() {
  yotpoVariables();
  sendReviewsRequest();
  bindUIActions();
};
