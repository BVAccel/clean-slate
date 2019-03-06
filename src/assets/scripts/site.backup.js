(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.NavigationView = (function(superClass) {
    extend(NavigationView, superClass);

    function NavigationView() {
      return NavigationView.__super__.constructor.apply(this, arguments);
    }

    NavigationView.prototype.events = {
      'click .header-drawer .has-dropdown > a': 'toggleNavigation',
      'focus .header-navigation-list-arrow': 'toggleNavigation'
    };

    NavigationView.prototype.initialize = function() {
      this.$el.on('click', (function(_this) {
        return function(e) {
          if (!$(e.target).closest('.navigation').length) {
            return _this.$('.navigation .open').removeClass('open');
          }
        };
      })(this));
      this.$el.on('focus', '.header-navigation-link.primary-link', (function(_this) {
        return function() {
          var $menuWrapper;
          $menuWrapper = $(_this.$el.find('.has-dropdown.open'));
          if ($menuWrapper.length) {
            return $menuWrapper.toggleClass('open', false);
          }
        };
      })(this));
      return this.$el.on('focus', '[data-is-dropdown] .secondary-link', (function(_this) {
        return function(event) {
          var $target;
          $target = $(event.currentTarget);
          return $target.parents('.has-dropdown').toggleClass('open', true);
        };
      })(this));
    };

    NavigationView.prototype.toggleNavigation = function(e) {
      var $target;
      $target = $(e.target);
      if ($target.parents().hasClass('has-dropdown')) {
        e.preventDefault();
        return $target.parent().toggleClass('open');
      }
    };

    return NavigationView;

  })(Backbone.View);

}).call(this);

(function() {
  window.themeUtils = {
    debounce: function(func, threshold, execAsap) {
      var timeout;
      timeout = false;
      return function() {
        var args, delayed, obj;
        obj = this;
        args = arguments;
        delayed = function() {
          if (!execAsap) {
            func.apply(obj, args);
          }
          return timeout = null;
        };
        if (timeout) {
          clearTimeout(timeout);
        } else if (execAsap) {
          func.apply(obj, args);
        }
        return timeout = setTimeout(delayed, threshold || 100);
      };
    }
  };

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.GoalView = (function(superClass) {
    extend(GoalView, superClass);

    function GoalView() {
      return GoalView.__super__.constructor.apply(this, arguments);
    }

    GoalView.prototype.initialize = function() {
      this.$selector = $("[data-goal-countdown]");
      this.endDateTime = this.$selector.data("end-time");
      if (this.$selector.length && this.getRemainingTime().total >= 0) {
        return this.countDownTimer();
      } else {
        return $(document.body).addClass('has-goal-expired');
      }
    };

    GoalView.prototype.getRemainingTime = function() {
      var _day, _hour, _minute, _second, days, hours, minutes, seconds, t;
      _second = 1000;
      _minute = _second * 60;
      _hour = _minute * 60;
      _day = _hour * 24;
      t = Date.parse(this.endDateTime) - Date.parse(new Date());
      seconds = Math.floor((t / _second) % 60);
      minutes = Math.floor((t / _minute) % 60);
      hours = Math.floor((t / _hour) % 24);
      days = Math.floor(t / _day);
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    };

    GoalView.prototype.countDownTimer = function() {
      this.$countdownDays = this.$selector.find("[data-goal-countdown-days]");
      this.$countdownHours = this.$selector.find("[data-goal-countdown-hours]");
      this.$countdownMinutes = this.$selector.find("[data-goal-countdown-minutes]");
      this.$countdownSeconds = this.$selector.find("[data-goal-countdown-seconds]");
      this.lastDayText = this.$selector.data("alt-text");
      this.$productViewDays = $(".product-goal-info-days");
      this.$productViewDaysWrapper = $(".product-goal-info-remaining");
      this.runTimer();
      this.timer = setInterval((function(_this) {
        return function() {
          return _this.runTimer();
        };
      })(this), 1000);
      return setTimeout((function(_this) {
        return function() {
          return _this.$el.addClass("active");
        };
      })(this), 100);
    };

    GoalView.prototype.runTimer = function() {
      var timeRemaining;
      timeRemaining = this.getRemainingTime();
      if (timeRemaining.total <= 0) {
        this.$(".module-header-goal-time-up").removeClass("hide");
        this.$selector.addClass("hide");
        clearInterval(this.timer);
        return;
      } else {
        this.$countdownDays.html(timeRemaining.days);
        this.$countdownHours.html(timeRemaining.hours);
        this.$countdownMinutes.html(timeRemaining.minutes);
        this.$countdownSeconds.html(timeRemaining.seconds);
      }
      if (this.$productViewDays.length) {
        if (timeRemaining.total > 0 && timeRemaining.days === 0) {
          return this.$productViewDaysWrapper.html(this.lastDayText);
        } else {
          return this.$productViewDays.html(timeRemaining.days);
        }
      }
    };

    return GoalView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PasswordView = (function(superClass) {
    extend(PasswordView, superClass);

    function PasswordView() {
      return PasswordView.__super__.constructor.apply(this, arguments);
    }

    PasswordView.prototype.events = {
      "click .password-entry": "togglePasswordForm",
      "submit .password-embedded-newsletter-form": "toggleNewsletterSuccess"
    };

    PasswordView.prototype.initialize = function() {
      this.toggle = this.$(".password-entry");
      this.subscribeWrapper = this.$(".password-subscribe-wrapper");
      this.passwordWrapper = this.$(".password-form-wrapper");
      this.newsletterInput = ".newsletter-input";
      this.emailRegEx = new RegExp(/^((?!\.)[a-z0-9._%+-]+(?!\.)\w)@[a-z0-9-\.]+\.[a-z.]{2,5}(?!\.)\w$/i);
      $(window).on("load resize", window.themeUtils.debounce(this.setContentHeight, 100));
      if (this.$("[data-password-form-inner]").hasClass("has-errors")) {
        return this.togglePasswordForm();
      }
    };

    PasswordView.prototype.toggleNewsletterSuccess = function(event) {
      if (this.emailRegEx.test(this.$(this.newsletterInput).val())) {
        this.$(".password-embedded-newsletter-form").addClass("hidden");
        return this.$(".form-success.hidden").removeClass("hidden");
      } else {
        return event.preventDefault();
      }
    };

    PasswordView.prototype.togglePasswordForm = function() {
      this.passwordWrapper.add(this.subscribeWrapper).toggleClass("visible");
      if (this.passwordWrapper.hasClass("visible")) {
        return this.toggle.text(this.toggle.data("cancel"));
      } else {
        return this.toggle.text(this.toggle.data("enter-password"));
      }
    };

    PasswordView.prototype.setContentHeight = function() {
      var contentHeight, footer, footerHeight, headerHeight, windowHeight;
      footer = this.$(".footer-wrapper");
      windowHeight = $(window).height();
      headerHeight = this.$(".main-header-wrapper").outerHeight(true);
      footerHeight = footer.outerHeight(true);
      contentHeight = this.$(".main-content").outerHeight(true);
      if (windowHeight > headerHeight + contentHeight + footerHeight) {
        return footer.css({
          "position": "fixed"
        });
      } else {
        return footer.css({
          "position": "relative"
        });
      }
    };

    return PasswordView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.HeaderView = (function(superClass) {
    extend(HeaderView, superClass);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.events = {
      'click [data-search-toggle]': 'openSearch',
      'blur .header-search-input': 'closeSearch',
      'click [data-drawer-toggle]': 'toggleCollapsedNav',
      'calculateHeaderWidths': 'calculateHeaderWidths'
    };

    HeaderView.prototype.initialize = function(options) {
      this.window = $(window);
      this.body = $(document.body);
      this.headerWrapper = this.$el.parent('.header');
      this.mainHeader = this.$el.find('.main-header');
      return new NavigationView({
        el: this.body
      });
    };

    HeaderView.prototype.render = function() {
      if (Theme.headerSticky) {
        this.stickyHeader();
      }
      this.bindEvents();
      this.calculateHeaderWidths();
      if ($('html').hasClass('lt-ie9') && Theme.logo) {
        return this.verticallyCenterLogo();
      }
    };

    HeaderView.prototype.bindEvents = function() {
      return this.window.resize((function(_this) {
        return function() {
          var windowWidth;
          _this.calculateHeaderWidths();
          windowWidth = window.innerWidth || _this.window.width();
          if (windowWidth > 720 && _this.body.hasClass('showing-drawer') && !_this.$('.main-header').hasClass('collapsed-navigation')) {
            return _this.toggleCollapsedNav();
          }
        };
      })(this));
    };

    HeaderView.prototype.stickyHeader = function() {
      this.$stickHeader = this.$el.parent('.header');
      return this.window.on("scroll", (function(_this) {
        return function() {
          var scrollPosition;
          scrollPosition = _this.window.scrollTop();
          _this.headerWrapper.toggleClass('scrolled', scrollPosition > 0);
          if (theme.isHome) {
            $('[data-home-slideshow]').trigger('setSlideshowColor');
          }
          if (_this.$stickHeader.hasClass('full-window-slideshow')) {
            scrollPosition = scrollPosition < 0 ? 0 : scrollPosition;
            _this.$stickHeader.toggleClass('higher-than-slideshow', scrollPosition === 0);
            return _this.$stickHeader.toggleClass('lower-than-slideshow', scrollPosition > 0);
          }
        };
      })(this));
    };

    HeaderView.prototype.calculateHeaderWidths = function() {
      var brandingWidth, toolsWidth;
      if (!this.mainHeader.hasClass('collapsed-navigation')) {
        brandingWidth = this.$('.branding')[0].offsetWidth;
        toolsWidth = this.$('.header-tools')[0].offsetWidth;
        this.combinedWidth = brandingWidth + toolsWidth + 45 + 60;
      }
      return this.fitHeader();
    };

    HeaderView.prototype.fitHeader = function() {
      return this.mainHeader.toggleClass('collapsed-navigation', this.combinedWidth >= this.mainHeader[0].offsetWidth);
    };

    HeaderView.prototype.toggleCollapsedNav = function(e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      this.body.toggleClass('showing-drawer');
      if (Modernizr.csstransitions) {
        return this.$el.one('transitionend', (function(_this) {
          return function() {
            return _this.body.toggleClass('drawer-visible');
          };
        })(this));
      } else {
        return this.body.toggleClass('drawer-visible');
      }
    };

    HeaderView.prototype.openSearch = function() {
      if (window.innerWidth <= 720) {
        window.location.href = '/search';
        return;
      }
      this.$('.header-search-wrapper').addClass('active').find('input').focus();
      return this.$('.header-search-wrapper').on('keyup.search', (function(_this) {
        return function(e) {
          if (e.keyCode === 27) {
            return _this.closeSearch();
          }
        };
      })(this));
    };

    HeaderView.prototype.closeSearch = function() {
      return this.$('.header-search-wrapper').removeClass('active').off('keyup.search');
    };

    return HeaderView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ZoomView = (function(superClass) {
    extend(ZoomView, superClass);

    function ZoomView() {
      return ZoomView.__super__.constructor.apply(this, arguments);
    }

    ZoomView.prototype.events = {
      'prepare-zoom': 'prepareZoom',
      'click': 'toggleZoom',
      'mouseover .product-image-zoom': 'prepareZoom',
      'mouseout .product-image-zoom': 'toggleZoom',
      'mousemove .product-image-zoom': 'zoomImage'
    };

    ZoomView.prototype.initialize = function() {
      this.zoomArea = this.$('.product-image-zoom');
      return this.$el.imagesLoaded((function(_this) {
        return function() {
          return _this.prepareZoom();
        };
      })(this));
    };

    ZoomView.prototype.prepareZoom = function() {
      var newImage;
      newImage = new Image();
      $(newImage).on('load', (function(_this) {
        return function() {
          var hideZoom, highRes, photoAreaHeight, photoAreaWidth, ratio;
          photoAreaWidth = _this.$el.width();
          photoAreaHeight = _this.$el.height();
          _this.zoomImageWidth = newImage.width;
          _this.zoomImageHeight = newImage.height;
          ratio = photoAreaWidth / photoAreaHeight;
          hideZoom = true;
          if (ratio >= 1) {
            hideZoom = false;
          }
          if (hideZoom) {
            _this.$el.removeClass('zoom-enabled');
          } else {
            _this.$el.addClass('zoom-enabled');
            highRes = _this.$el.find('[data-high-res]').attr('data-high-res');
            return _this.zoomArea.css({
              backgroundImage: "url(" + highRes + ")"
            });
          }
        };
      })(this));
      return newImage.src = this.$('img').attr('src');
    };

    ZoomView.prototype.toggleZoom = function(e) {
      if (this.$el.hasClass('zoom-enabled')) {
        if (e.type === 'mouseout') {
          this.zoomArea.removeClass('active');
          this.zoomArea.css({
            backgroundPosition: '50% 50%'
          });
          return;
        }
        if (this.zoomArea.hasClass('active')) {
          this.zoomArea.removeClass('active');
        } else {
          this.zoomArea.addClass('active');
        }
        return this.zoomImage(e);
      }
    };

    ZoomView.prototype.zoomImage = function(e) {
      var bigImageOffset, bigImageX, bigImageY, mousePositionX, mousePositionY, ratioX, ratioY, zoomHeight, zoomWidth;
      zoomWidth = this.zoomArea.width();
      zoomHeight = this.zoomArea.height();
      bigImageOffset = this.$el.offset();
      bigImageX = Math.round(bigImageOffset.left);
      bigImageY = Math.round(bigImageOffset.top);
      mousePositionX = e.pageX - bigImageX;
      mousePositionY = e.pageY - bigImageY;
      if (mousePositionX < zoomWidth && mousePositionY < zoomHeight && mousePositionX > 0 && mousePositionY > 0) {
        if (this.zoomArea.hasClass('active')) {
          ratioY = (e.pageY - bigImageY) / zoomHeight * 100;
          ratioX = (e.pageX - bigImageX) / zoomWidth * 100;
          return this.zoomArea.css({
            backgroundPosition: ratioX + "% " + ratioY + "%"
          });
        }
      }
    };

    return ZoomView;

  })(Backbone.View);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ProductView = (function(superClass) {
    extend(ProductView, superClass);

    function ProductView() {
      this.selectCallback = bind(this.selectCallback, this);
      return ProductView.__super__.constructor.apply(this, arguments);
    }

    ProductView.prototype.events = {
      "change .product-options select": "updateVariantLabel",
      "mouseover .product-slideshow-pagination-item": "updateProductImage",
      "submit .product-form": "addToCart",
      "click .product-tabs-header-item": "tabs",
      "click .product-slideshow-navigation": "navigate",
      "click .number-input-nav-item": "amount"
    };

    ProductView.prototype.initialize = function() {
      this.processing = false;
      this.addToCartButton = this.$(".add-to-cart input");
      this.priceArea = this.$(".product-price");
      this.options = window.productJSON.options;
      this.variants = window.productJSON.variants;
      this.noImageURL = this.$(".product-big-image").data("no-image-svg");
      if ($("html").hasClass("no-svg")) {
        this.noImageURL = this.$(".product-big-image").data("no-image-png");
      }
      if (Theme.imageZoom) {
        this.zoomView = new ZoomView({
          el: this.$(".product-big-image")
        });
      }
      if (Theme.currencySwitcher) {
        this.switchCurrency();
      }
      if (this.variants.length > 1) {
        this.setupSelectors();
        if (this.options.length === 1) {
          this.singleSelector();
        }
        setTimeout((function(_this) {
          return function() {
            return _this.$(".single-option-selector").each(function(i, select) {
              return _this.updateVariantLabel(null, select);
            });
          };
        })(this), 1000);
      } else {
        this.setOptionsVisibility();
      }
      this.cacheImages();
      Shopify.onError = (function(_this) {
        return function(XMLHttpRequest) {
          return _this.handleErrors(XMLHttpRequest);
        };
      })(this);
      return this.$('.product-slideshow-navigation').on("mouseout", (function(_this) {
        return function(event) {
          return $(event.currentTarget).blur();
        };
      })(this));
    };

    ProductView.prototype.switchCurrency = function() {
      return $(document.body).trigger("reset-currency");
    };

    ProductView.prototype.cacheImages = function() {
      var image, imageHighRes, images, j, len;
      this.preloadImages = [];
      images = this.$(".product-thumbnails .product-slideshow-pagination-item");
      for (j = 0, len = images.length; j < len; j++) {
        image = images[j];
        imageHighRes = $(image).data("high-res").split("?v=")[0];
        this.preloadImages.push(imageHighRes);
      }
      return Shopify.Image.preload(this.preloadImages, "master");
    };

    ProductView.prototype.updateProductImage = function(e, index) {
      var $target, highSrc, newAlt, newSrc;
      if (e) {
        e.preventDefault();
      }
      this.$(".product-slideshow-pagination-item.active").removeClass("active");
      $target = e ? $(e.currentTarget) : this.$(".product-thumbnails .product-slideshow-pagination-item").eq(index);
      newSrc = $target.data("default-res");
      highSrc = $target.data("high-res");
      newAlt = $target.data("alt");
      $target.addClass("active");
      this.$(".product-big-image img").removeClass("product-no-images").attr("src", newSrc).attr("data-high-res", highSrc).attr("alt", newAlt);
      if (Theme.imageZoom) {
        return setTimeout(function() {
          return this.$(".product-big-image").trigger("prepare-zoom");
        }, 200);
      }
    };

    ProductView.prototype.setupSelectors = function() {
      var enableHistory, selector;
      enableHistory = !$(document.body).hasClass("template-index");
      selector = this.$("#product-select");
      if (selector.length) {
        new Shopify.OptionSelectors("product-select", {
          product: window.productJSON,
          onVariantSelected: this.selectCallback,
          enableHistoryState: enableHistory
        });
      }
      return this.setOptionsVisibility();
    };

    ProductView.prototype.setOptionsVisibility = function() {
      var visibility;
      visibility = window.productJSON.available ? "visible" : "hidden";
      this.$(".product-options").addClass(visibility);
      return this.$(".product-quantity").addClass(visibility);
    };

    ProductView.prototype.singleSelector = function() {
      return this.$(".selector-wrapper").prepend("<label>" + this.options[0] + "</label>");
    };

    ProductView.prototype.selectCallback = function(variant, selector) {
      var newImage;
      if (variant) {
        if (variant.available) {
          this.addToCartButton.val(Theme.addToCartText).removeClass("disabled").removeAttr("disabled");
        } else {
          this.addToCartButton.val(Theme.soldOutText).addClass("disabled").attr("disabled", "disabled");
        }
        if (variant.compare_at_price > variant.price) {
          this.priceArea.find(".money:first-child").html(Shopify.formatMoney(variant.price, Theme.moneyFormat));
          this.priceArea.find(".original").html(Shopify.formatMoney(variant.compare_at_price, Theme.moneyFormat)).show();
          this.priceArea.find(".saving").show();
          this.priceArea.find(".saving-result").html(Shopify.formatMoney(variant.compare_at_price - variant.price, Theme.moneyFormat));
        } else {
          this.priceArea.find(".money").html(Shopify.formatMoney(variant.price, Theme.moneyFormat));
          this.priceArea.find(".original").hide();
          this.priceArea.find(".saving").hide();
        }
      } else {
        this.addToCartButton.val(Theme.unavailableText).addClass("disabled").attr("disabled", "disabled");
      }
      if (Theme.currencySwitcher) {
        this.switchCurrency();
      }
      if (variant && variant.featured_image) {
        newImage = variant.featured_image.position - 1;
        if (!this.$(".home-slideshow").length) {
          return this.updateProductImage(null, newImage);
        }
      }
    };

    ProductView.prototype.updateVariantLabel = function(e, select) {
      var label, renderedLabel, selectedVariant;
      select = e ? e.target : select;
      select = $(select);
      label = $(select).parents(".selector-wrapper").find("label").text();
      selectedVariant = select.find("option:selected").val();
      renderedLabel = "<strong>" + label + ":</strong>";
      return select.prev(".selected-text").html(renderedLabel + " " + selectedVariant);
    };

    ProductView.prototype.addToCart = function(e) {
      var quantity, selectedVariant;
      if (Theme.disableCartAjax) {
        return;
      }
      e.preventDefault();
      if (this.processing) {
        return;
      }
      this.processing = true;
      if (Modernizr.cssanimations) {
        this.$(".add-to-cart").addClass("loading");
      } else {
        this.addToCartButton.val(Theme.processingText);
      }
      selectedVariant = this.$("#product-select").length ? this.$("#product-select").val() : this.$(".product-select").val();
      quantity = this.$("input[name='quantity']").val();
      if (quantity === "" || quantity === "0") {
        return setTimeout((function(_this) {
          return function() {
            _this.$("input[name='quantity']").addClass("error");
            _this.$(".product-add-error-message").text(Theme.setQuantityText);
            _this.$(".add-to-cart").removeClass("loading added-success").addClass("added-error");
            return _this.processing = false;
          };
        })(this), 500);
      } else {
        return Shopify.addItem(selectedVariant, quantity, (function(_this) {
          return function(cartItem) {
            return setTimeout(function() {
              if (theme.isHome && _this.$(".add-to-cart").hasClass("express")) {
                window.location.href = "/checkout";
              } else {
                Shopify.getCart(function(cart) {
                  return $(".cart-link .cart-count").text(cart.item_count);
                });
                _this.$(".added-product-name").text(cartItem.title);
                _this.$("input[name='quantity']").removeClass("error");
                _this.$(".add-to-cart").removeClass("loading added-error").addClass("added-success");
                $(".header-cart-count").addClass("active");
                // Display Cart Preview (Daniel Reinke)
                //$("#cart-preview-product-title").html(cartItem.title);
                $("#cart-preview-quantity").html(cartItem.quantity);
                $("#cart-preview-variant").html(cartItem.variant_title);
                Shopify.getCart(function(cart) {
                  return $("#cart-preview-total-items-cart").html(cart.item_count);
                });
                $("#cart-preview").removeClass("hidden");
                if (!Modernizr.cssanimations) {
                  _this.addToCartButton.val(Theme.addToCartText);
                }
              }
              return _this.processing = false;
            }, 1000);
          };
        })(this));
      }
    };

    ProductView.prototype.handleErrors = function(errors) {
      var errorDescription, errorMessage, productTitle, ref;
      errorMessage = $.parseJSON(errors.responseText);
      productTitle = this.$(".page-title").text();
      errorDescription = errorMessage.description;
      if (((ref = errorMessage.description) != null ? ref.indexOf(productTitle) : void 0) > -1) {
        errorDescription = errorDescription.replace(productTitle, "<em>" + productTitle + "</em>");
      }
      if (errorMessage.message === "Cart Error") {
        return setTimeout((function(_this) {
          return function() {
            _this.$("input[name='quantity']").removeClass("error");
            _this.$(".product-add-error-message").html(errorDescription);
            _this.$(".add-to-cart").removeClass("loading added-success").addClass("added-error");
            if (!Modernizr.cssanimations) {
              _this.addToCartButton.val(Theme.addToCartText);
            }
            return _this.processing = false;
          };
        })(this), 1000);
      }
    };

    ProductView.prototype.tabs = function(e) {
      var body_target, target;
      target = $(e.currentTarget).attr("rel");
      body_target = $(e.currentTarget).parents(".product-tabs").find(".product-tabs-body-item[rel='" + target + "']");
      $(e.currentTarget).addClass("active").siblings().removeClass("active");
      return body_target.addClass("active").siblings().removeClass("active");
    };

    ProductView.prototype.navigate = function(e) {
      var index, target, total;
      if (e) {
        e.preventDefault();
      }
      total = this.$(".product-slideshow-pagination-item").size() - 1;
      index = this.$(".product-slideshow-pagination-item.active").index();
      if (this.$(e.currentTarget).hasClass("product-slideshow-next")) {
        if (index === total) {
          target = 0;
        } else {
          target = this.$(".product-slideshow-pagination-item.active").next().index();
        }
      } else {
        if (index === 0) {
          target = total;
        } else {
          target = this.$(".product-slideshow-pagination-item.active").prev().index();
        }
      }
      return this.updateProductImage(false, target);
    };

    ProductView.prototype.amount = function(e) {
      var input, result;
      input = $(e.currentTarget).parents(".number-input-wrapper").find('input');
      result = parseFloat(input.val());
      if ($(e.currentTarget).hasClass("icon-plus")) {
        return input.val(result + 1);
      } else {
        if (result > 0) {
          return input.val(result - 1);
        }
      }
    };

    return ProductView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.SlideshowView = (function(superClass) {
    extend(SlideshowView, superClass);

    function SlideshowView() {
      return SlideshowView.__super__.constructor.apply(this, arguments);
    }

    SlideshowView.prototype.events = {
      'click .home-slideshow-previous': 'previousSlide',
      'click .home-slideshow-next': 'nextSlide',
      'click .home-slideshow-pagination > span': 'specificSlide',
      'mouseenter': 'pauseLoop',
      'mouseleave': 'startLoop',
      'setSlideshowColor': 'setSlideshowColor'
    };

    SlideshowView.prototype.initialize = function() {
      this.openingScreen = this.$el.hasClass('full-window');
      this.$headerNavigation = $('[data-main-header]');
      this.$slideShow = this.$('.home-slideshow');
      this.slideNavigation = this.$('.home-slideshow-navigation');
      this.slidePagination = this.$('.home-slideshow-pagination');
      this.ltIE9 = $('html').hasClass('lt-ie9');
      this.slideNavigation.on("mouseout", (function(_this) {
        return function(event) {
          return $(event.currentTarget).blur();
        };
      })(this));
      this.setupSlides();
      this.setSlideshowColor(null, this.$slideShow.find('.active'));
      return this.transitionend = (function(transition) {
        var transEndEventNames;
        transEndEventNames = {
          "-webkit-transition": "webkitTransitionEnd",
          "-moz-transition": "transitionend",
          "-o-transition": "oTransitionEnd",
          transition: "transitionend"
        };
        return transEndEventNames[transition];
      })(Modernizr.prefixed("transition"));
    };

    SlideshowView.prototype.setSlideshowColor = function(event, slide) {
      var slideText;
      if (slide) {
        slideText = slide.data('slide-text');
      } else {
        slideText = this.$slideShow.find('.active').data('slide-text');
      }
      if (slideText !== this.slideText) {
        if ($('body').hasClass('template-index')) {
          $('body').removeClass('slide-color-light slide-color-dark').addClass("slide-color-" + slideText);
        }
        return this.slideText = slideText;
      }
    };

    SlideshowView.prototype.setupSlides = function() {
      var paginationWidth, windowHeight, windowWidth;
      this.slides = this.$('.home-slide');
      this.slideCount = this.slides.length;
      this.$('.home-slideshow-pagination span:first').addClass('active');
      if (this.ltIE9) {
        paginationWidth = this.slidePagination.width();
        this.slidePagination.css({
          marginLeft: -(paginationWidth / 2)
        });
      }
      windowWidth = window.innerWidth || document.documentElement.clientWidth;
      windowHeight = window.innerHeight || document.documentElement.clientHeight;
      return this.$el.imagesLoaded((function(_this) {
        return function() {
          var i, image, imageHeight, j, len, ref, slide, slideHeight, slideID, slideText, textHeight, textWidth;
          ref = _this.slides;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            slide = ref[i];
            slide = $(slide);
            slideID = slide.attr('id');
            if (_this.openingScreen && windowWidth > 720) {
              imageHeight = windowHeight;
              slide.height(imageHeight);
              if (_this.ltIE9) {
                slide.css('background-image', '').find('img').show().height(imageHeight);
              }
            } else {
              image = slide.find('.slide-image');
              imageHeight = image.height();
            }
            slide.data('height', imageHeight);
            slideHeight = windowWidth <= 720 ? slide.height() : imageHeight;
            if (_this.ltIE9) {
              slideText = slide.find('.slide-text');
              textHeight = slideText.height();
              slideText.css({
                marginTop: -(textHeight / 2)
              });
              if (slide.hasClass('text-aligned-center')) {
                textWidth = slideText.outerWidth();
                slideText.css({
                  marginLeft: -(textWidth / 2)
                });
              }
            }
            if (i === 0) {
              slide.addClass('active');
              _this.$el.height(slideHeight);
              _this.setNavHeight(imageHeight);
              _this.$el.attr('id', "viewing-" + slideID);
            }
            if (i + 1 === _this.slideCount) {
              _this.$el.addClass('slides-ready');
            }
          }
          $(window).on('resize', function() {
            return _this.resetSlideHeights();
          });
          if (Theme.slideshowAutoplay) {
            return _this.startLoop();
          }
        };
      })(this));
    };

    SlideshowView.prototype.resetSlideHeights = function() {
      var image, imageHeight, j, len, ref, results, slide, slideHeight, windowHeight, windowWidth;
      windowWidth = window.innerWidth || document.documentElement.clientWidth;
      windowHeight = window.innerHeight || document.documentElement.clientHeight;
      ref = this.slides;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        slide = ref[j];
        slide = $(slide);
        if (this.openingScreen && windowWidth > 720) {
          imageHeight = windowHeight;
          slide.height(imageHeight);
        } else {
          image = slide.find('.slide-image');
          imageHeight = image.height();
          slide.css('height', '');
        }
        slide.data('height', imageHeight);
        slideHeight = windowWidth <= 720 ? slide.height() : imageHeight;
        if (slide.hasClass('active')) {
          this.$el.height(slideHeight);
          results.push(this.setNavHeight(imageHeight));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    SlideshowView.prototype.resetPaginationPosition = function(height) {
      var windowWidth;
      windowWidth = window.innerWidth || document.documentElement.clientWidth;
      if (windowWidth <= 720) {
        return this.slidePagination.css({
          bottom: 'auto',
          top: height - 50
        });
      } else {
        return this.slidePagination.css({
          bottom: 0,
          top: 'auto'
        });
      }
    };

    SlideshowView.prototype.previousSlide = function(e) {
      if (this.sliding) {
        return;
      }
      this.showNewSlide('prev');
      return e.preventDefault();
    };

    SlideshowView.prototype.nextSlide = function(e) {
      if (this.sliding) {
        return;
      }
      this.showNewSlide('next');
      if (e) {
        return e.preventDefault();
      }
    };

    SlideshowView.prototype.specificSlide = function(e) {
      var nextSlideID;
      if (!$(e.currentTarget).hasClass('active')) {
        nextSlideID = $(e.currentTarget).data('slide-id');
        return this.showNewSlide('next', nextSlideID);
      }
    };

    SlideshowView.prototype.updateSlidePagination = function(index) {
      this.slidePagination.find('.active').removeClass('active');
      return this.slidePagination.find('> span').eq(index).addClass('active');
    };

    SlideshowView.prototype.showNewSlide = function(type, specificSlide) {
      var activeSlide, called, direction, fallback, imageHeight, nextSlide, slideHeight, slideID, windowWidth;
      this.sliding = true;
      called = false;
      if (this.slides.length === 1) {
        this.sliding = false;
        return;
      }
      direction = type === 'next' ? 'left' : 'right';
      fallback = type === 'next' ? 'first' : 'last';
      activeSlide = this.$slideShow.find('.active');
      nextSlide = specificSlide ? this.$("#" + specificSlide) : activeSlide[type]();
      nextSlide = nextSlide.length ? nextSlide : this.slides[fallback]();
      nextSlide.addClass(type);
      nextSlide[0].offsetWidth;
      activeSlide.addClass(direction);
      nextSlide.addClass(direction);
      this.setSlideshowColor(null, nextSlide);
      if ($('html').hasClass('lt-ie10')) {
        nextSlide.removeClass([type, direction].join(' ')).addClass('active');
        activeSlide.removeClass(['active', direction].join(' '));
        this.sliding = false;
      } else {
        nextSlide.one(this.transitionend, (function(_this) {
          return function() {
            called = true;
            nextSlide.removeClass([type, direction].join(' ')).addClass('active');
            activeSlide.removeClass(['active', direction].join(' '));
            return _this.sliding = false;
          };
        })(this));
        setTimeout((function(_this) {
          return function() {
            if (!called) {
              return nextSlide.trigger(_this.transitionend);
            }
          };
        })(this), 700);
      }
      imageHeight = nextSlide.data('height');
      this.updateSlidePagination(nextSlide.index());
      this.setNavHeight(imageHeight);
      windowWidth = window.innerWidth || document.documentElement.clientWidth;
      slideHeight = windowWidth <= 720 ? nextSlide.height() : imageHeight;
      slideID = nextSlide.attr('id');
      this.$el.attr('id', "viewing-" + slideID);
      this.$el.height(slideHeight);
      return this.$headerNavigation.trigger("calculateHeaderWidths");
    };

    SlideshowView.prototype.startLoop = function() {
      var delay;
      if (Theme.slideshowAutoplay) {
        delay = Theme.slideshowAutoplayDelay * 1000;
        return this.autoplay = setInterval((function(_this) {
          return function() {
            return _this.nextSlide();
          };
        })(this), delay);
      }
    };

    SlideshowView.prototype.pauseLoop = function() {
      return clearInterval(this.autoplay);
    };

    SlideshowView.prototype.setNavHeight = function(imageHeight) {
      imageHeight = Theme.slideshowFullBleed && $(window).width() > 720 ? imageHeight + 60 : imageHeight;
      return this.slideNavigation.css({
        lineHeight: imageHeight + "px"
      });
    };

    return SlideshowView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ProductDetailsSlideshowView = (function(superClass) {
    extend(ProductDetailsSlideshowView, superClass);

    function ProductDetailsSlideshowView() {
      return ProductDetailsSlideshowView.__super__.constructor.apply(this, arguments);
    }

    ProductDetailsSlideshowView.prototype.events = {
      'click .product-details-slideshow-nav-list-item': 'specificSlide'
    };

    ProductDetailsSlideshowView.prototype.initialize = function() {
      this.slidePagination = this.$('.product-details-slideshow-nav-list');
      this.ltIE9 = $('html').hasClass('lt-ie9');
      this.slidePagination.children().first().addClass("active");
      return this.$el.find(".product-details-slideshow-list-item").first().addClass("active");
    };

    ProductDetailsSlideshowView.prototype.specificSlide = function(e) {
      var current, index;
      e.preventDefault();
      if (!$(e.currentTarget).hasClass('active')) {
        index = $(e.currentTarget).attr('data-position');
        current = $(e.currentTarget);
        return this.updateSlidePagination(index);
      }
    };

    ProductDetailsSlideshowView.prototype.updateSlidePagination = function(index) {
      this.$el.find(".product-details-slideshow-nav-list-item").removeClass("active");
      this.$el.find(".product-details-slideshow-nav-list-item[data-position='" + index + "']").addClass("active");
      return this.showNewSlide(index);
    };

    ProductDetailsSlideshowView.prototype.showNewSlide = function(index) {
      return this.$el.find(".product-details-slideshow-list-item[data-position='" + index + "']").addClass('active').focus().siblings().removeClass('active');
    };

    return ProductDetailsSlideshowView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.TestimonialView = (function(superClass) {
    extend(TestimonialView, superClass);

    function TestimonialView() {
      return TestimonialView.__super__.constructor.apply(this, arguments);
    }

    TestimonialView.prototype.events = {
      "click .home-testimonials-pagination-list-item": "paginate",
      "click .home-testimonials-navigation-item a": "navigate"
    };

    TestimonialView.prototype.initialize = function() {
      var count, slide;
      this.slideList = this.$(".home-testimonials-slides-list");
      this.pageList = this.$(".home-testimonials-pagination-list");
      slide = this.slideList.children();
      count = this.slideList.children().length;
      if (count > 1) {
        slide.last().clone().removeAttr("data-position").addClass("cloned").prependTo(this.slideList);
        slide.first().clone().removeAttr("data-position").addClass("cloned").appendTo(this.slideList);
      } else {
        this.slideList.parents(".home-testimonials").addClass("static");
      }
      this.slideHeight(1);
      this.slideWidth();
      if (count > 1) {
        this.slideRotate(1);
      }
      this.slideList.parents(".home-testimonials").addClass("ready");
      $(window).on("resize", (function(_this) {
        return function() {
          var index;
          index = _this.slideList.children(".active").attr("data-position");
          _this.slideHeight(index);
          _this.slideWidth();
          if (count > 1) {
            return _this.slideAnim(index);
          }
        };
      })(this));
      return this.$('.home-testimonials-navigation-item a').on("mouseout", (function(_this) {
        return function(event) {
          return $(event.currentTarget).blur();
        };
      })(this));
    };

    TestimonialView.prototype.slideHeight = function(index) {
      return this.slideList.height(this.slideList.children("div[data-position='" + index + "']").height());
    };

    TestimonialView.prototype.slideWidth = function() {
      this.slideList.width(this.slideList.parent().width() * this.slideList.children().length);
      return this.slideList.children().width(this.slideList.parent().width());
    };

    TestimonialView.prototype.slideAnim = function(index) {
      return this.slideList.css({
        "margin-left": -index * this.slideList.parent().width()
      });
    };

    TestimonialView.prototype.slideRotate = function(index) {
      this.slideList.children().removeClass("active");
      this.pageList.children().removeClass("active");
      this.slideList.children("div[data-position='" + index + "']").addClass("active");
      this.pageList.children("div[data-position='" + index + "']").addClass("active");
      return this.slideAnim(index);
    };

    TestimonialView.prototype.paginate = function(e) {
      var index;
      if (!$(e.currentTarget).hasClass("active")) {
        index = $(e.currentTarget).attr("data-position");
        this.slideRotate(index);
        return this.slideHeight(index);
      }
    };

    TestimonialView.prototype.navigate = function(e) {
      var $navigation, index;
      if (e) {
        e.preventDefault();
      }
      $navigation = $(e.currentTarget).parent('div');
      if ($navigation.hasClass("next-slide")) {
        if (!this.slideList.children(".active").next().hasClass("cloned")) {
          index = this.slideList.children(".active").next().attr("data-position");
        } else {
          index = 1;
        }
      }
      if ($navigation.hasClass("previous-slide")) {
        if (!this.slideList.children(".active").prev().hasClass("cloned")) {
          index = this.slideList.children(".active").prev().attr("data-position");
        } else {
          index = this.slideList.children().length - 2;
        }
      }
      this.slideRotate(index);
      return this.slideHeight(index);
    };

    return TestimonialView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.VideoView = (function(superClass) {
    extend(VideoView, superClass);

    function VideoView() {
      return VideoView.__super__.constructor.apply(this, arguments);
    }

    VideoView.prototype.events = {
      "click [data-overlay-play]": "activateVideo"
    };

    VideoView.prototype.activateVideo = function() {
      var $container;
      $container = this.$el.find("[data-video-wrapper]");
      $container.addClass("active");
      setTimeout((function(_this) {
        return function() {
          var $overlayWrapper;
          $overlayWrapper = _this.$el.find("[data-video-overlay]");
          return $overlayWrapper.addClass("inactive");
        };
      })(this), 200);
      return setTimeout((function(_this) {
        return function() {
          var $video, $videoSrc, $videoSrcNew, delimiter;
          $video = _this.$el.find("iframe[src*=\"youtube.com/embed\"]");
          $videoSrc = $video.attr("src");
          delimiter = ($videoSrc != null ? $videoSrc.indexOf("?" > -1) : void 0) ? "?" : "&";
          $videoSrcNew = ($videoSrc + delimiter) + "autoplay=1";
          return $video.attr("src", $videoSrcNew);
        };
      })(this), 400);
    };

    return VideoView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.HomeView = (function(superClass) {
    extend(HomeView, superClass);

    function HomeView() {
      return HomeView.__super__.constructor.apply(this, arguments);
    }

    HomeView.prototype.initialize = function() {
      this.$homeOrderNow = this.$('.home-order-now');
      this.$homeSlideshowWrapper = this.$('.home-slideshow-wrapper');
      this.$productDetailSlidehow = this.$('.product-details-slideshow');
      this.$homeTestimonials = this.$('.home-testimonials');
      this.$videos = this.$('.home-left-right-video, .home-full-width-video, .full-width-video');
      return this.$videoWrappers = this.$('.video-wrapper');
    };

    HomeView.prototype.render = function() {
      if (this.$videos.length) {
        this.$videos.fitVids();
      }
      if (this.$videoWrappers.length) {
        this.$videoWrappers.each((function(_this) {
          return function(i, item) {
            return new VideoView({
              el: $(item)
            });
          };
        })(this));
      }
      if (this.$homeOrderNow.length) {
        new ProductView({
          el: this.$homeOrderNow
        });
      }
      if (this.$homeSlideshowWrapper.length) {
        new SlideshowView({
          el: this.$homeSlideshowWrapper
        });
      }
      if (this.$productDetailSlidehow.length) {
        new ProductDetailsSlideshowView({
          el: this.$productDetailSlidehow
        });
      }
      if (this.$homeTestimonials.length) {
        return new TestimonialView({
          el: this.$homeTestimonials
        });
      }
    };

    return HomeView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.CollectionView = (function(superClass) {
    extend(CollectionView, superClass);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.events = {
      'change .collection-tag-selector select': 'browseByTag'
    };

    CollectionView.prototype.browseByTag = function(e) {
      var fallback, newTag, select;
      select = $(e.target);
      fallback = select.parents(".select-wrapper").find("select").data('fallback-url');
      newTag = select.parents(".select-wrapper").find(':selected').attr('name');
      if (newTag === 'reset') {
        return window.location.href = fallback;
      } else {
        return window.location.href = fallback + "/" + newTag;
      }
    };

    return CollectionView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ListCollectionsView = (function(superClass) {
    extend(ListCollectionsView, superClass);

    function ListCollectionsView() {
      return ListCollectionsView.__super__.constructor.apply(this, arguments);
    }

    ListCollectionsView.prototype.events = {};

    ListCollectionsView.prototype.initialize = function() {
      var collection, collectionDetails, collections, i, len, results;
      if ($('html').hasClass('lt-ie9')) {
        collections = this.$('.collection-list-item');
        results = [];
        for (i = 0, len = collections.length; i < len; i++) {
          collection = collections[i];
          collectionDetails = $(collection).find('.collection-details');
          results.push(this.verticallyAlignText(collectionDetails));
        }
        return results;
      }
    };

    ListCollectionsView.prototype.verticallyAlignText = function(collectionDetails) {
      var textHeight;
      textHeight = collectionDetails.height();
      return collectionDetails.css({
        marginTop: -(textHeight / 2)
      });
    };

    ListCollectionsView.prototype.render = function() {};

    return ListCollectionsView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.CartView = (function(superClass) {
    extend(CartView, superClass);

    function CartView() {
      return CartView.__super__.constructor.apply(this, arguments);
    }

    CartView.prototype.events = {
      'click .cart-item-decrease': 'updateQuantity',
      'click .cart-item-increase': 'updateQuantity',
      'change .cart-instructions textarea': 'saveSpecialInstructions',
      'click .dismiss': 'closeModal',
      'click .get-rates': 'calculateShipping'
    };

    CartView.prototype.initialize = function() {
      this.modalWrapper = this.$('.cart-modal-wrapper');
      this.modalTitle = this.$('.cart-modal h3');
      this.modalMessage = this.$('.cart-modal-message');
      this.modalAction = this.$('.cart-modal-action');
      if (Theme.shippingCalculator && this.$('.cart-items').length) {
        this.shippingCalculator();
      }
      return Shopify.onError = (function(_this) {
        return function(XMLHttpRequest) {
          return _this.handleErrors(XMLHttpRequest);
        };
      })(this);
    };

    CartView.prototype.saveSpecialInstructions = function() {
      var newNote;
      newNote = $('.cart-instructions textarea').val();
      return Shopify.updateCartNote(newNote, function(cart) {});
    };

    CartView.prototype.updateQuantity = function(e) {
      var action, inventory, message, newQuantity, oldQuantity, productPrice, productQuantity, productRow, productTitle, title, variant;
      productRow = $(e.target).parents('tr');
      productTitle = productRow.find('.cart-title').text();
      productPrice = productRow.find('td.cart-item-total .money');
      productQuantity = productRow.find('.cart-item-quantity-display');
      variant = productRow.data('variant');
      inventory = parseInt(productRow.find('.cart-item-quantity').data('max'), 10);
      oldQuantity = parseInt(productQuantity.val(), 10);
      if ($(e.target).hasClass('cart-item-increase')) {
        newQuantity = oldQuantity + 1;
      } else {
        newQuantity = oldQuantity <= 1 ? 0 : oldQuantity - 1;
      }
      if (newQuantity > inventory) {
        title = Theme.notAvailableText;
        message = Theme.stockLevelText;
        message = message.replace('{{ stock_count }}', inventory);
        action = "<span class='button dismiss'>" + Theme.okayText + "</span>";
        return this.openModal(title, message, action);
      }
      return productRow.find('.cart-item-quantity-display').val(newQuantity);
    };

    CartView.prototype.shippingCalculator = function() {
      var selectableOptions;
      Shopify.Cart.ShippingCalculator.show({
        submitButton: Theme.shippingSubmit,
        submitButtonDisabled: Theme.shippingWorking,
        customerIsLoggedIn: Theme.customerLoggedIn,
        moneyFormat: Theme.moneyFormat
      });
      selectableOptions = this.$('.cart-shipping-calculator select');
      setTimeout((function(_this) {
        return function() {
          var i, len, results, select;
          results = [];
          for (i = 0, len = selectableOptions.length; i < len; i++) {
            select = selectableOptions[i];
            results.push(_this.updateShippingLabel(select));
          }
          return results;
        };
      })(this), 500);
      return this.$('.cart-shipping-calculator select').change((function(_this) {
        return function(e) {
          var i, len, results, select;
          results = [];
          for (i = 0, len = selectableOptions.length; i < len; i++) {
            select = selectableOptions[i];
            results.push(_this.updateShippingLabel(select));
          }
          return results;
        };
      })(this));
    };

    CartView.prototype.calculateShipping = function() {
      var shippingAddress;
      $('.get-rates').val(Theme.shippingWorking);
      shippingAddress = {};
      shippingAddress.zip = $('.address-zip').val() || '';
      shippingAddress.country = $('.address-country').val() || '';
      shippingAddress.province = $('.address-province').val() || '';
      return Shopify.getCartShippingRatesForDestination(shippingAddress, function() {
        var address, firstRate, i, len, price, rate, rateValues, ratesFeedback, responseText, shippingCalculatorResponse;
        if (shippingAddress.zip.length) {
          address = shippingAddress.zip;
        }
        if (shippingAddress.province.length) {
          address = address + ", " + shippingAddress.province;
        }
        if (shippingAddress.country.length) {
          address = address + ", " + shippingAddress.country;
        }
        shippingCalculatorResponse = $('.cart-shipping-calculator-response');
        shippingCalculatorResponse.empty().append("<p class='shipping-calculator-response message'/><ul class='shipping-rates'/>");
        ratesFeedback = $('.shipping-calculator-response');
        if (rates.length > 1) {
          firstRate = Shopify.Cart.ShippingCalculator.formatRate(rates[0].price);
          responseText = Theme.shippingCalcMultiRates.replace('{{ address }}', address).replace('{{ number_of_rates }}', rates.length).replace('{{ rate }}', "<span class='money'>" + firstRate + "</span>");
          ratesFeedback.html(responseText);
        } else if (rates.length === 1) {
          responseText = Theme.shippingCalcOneRate.replace('{{ address }}', address);
          ratesFeedback.html(responseText);
        } else {
          ratesFeedback.html(Theme.shippingCalcNoRates);
        }
        for (i = 0, len = rates.length; i < len; i++) {
          rate = rates[i];
          price = Shopify.Cart.ShippingCalculator.formatRate(rate.price);
          rateValues = Theme.shippingCalcRateValues.replace('{{ rate_title }}', rate.name).replace('{{ rate }}', "<span class='money'>" + price + "</span>");
          $('.shipping-rates').append("<li>" + rateValues + "</li>");
        }
        return $('.get-rates').val(Theme.shippingSubmit);
      });
    };

    CartView.prototype.updateShippingLabel = function(select) {
      var selectedOption;
      if (select) {
        select = $(select);
        selectedOption = select.find('option:selected').val();
        if (!selectedOption) {
          selectedOption = select.prev('.selected-text').data('default');
        }
        select.prev('.selected-text').text(selectedOption);
        return setTimeout((function(_this) {
          return function() {
            if (select.attr('name') === 'address[country]') {
              return _this.updateShippingLabel(_this.$('#address_province'));
            }
          };
        })(this), 500);
      }
    };

    CartView.prototype.openModal = function(title, message, action) {
      this.modalTitle.text(title);
      this.modalMessage.text(message);
      this.modalAction.html(action);
      return this.modalWrapper.addClass('active');
    };

    CartView.prototype.closeModal = function() {
      return this.modalWrapper.removeClass('active');
    };

    CartView.prototype.handleErrors = function(errors) {
      var errorMessage;
      errorMessage = $.parseJSON(errors.responseText);
      errorMessage = Theme.shippingCalcErrorMessage.replace('{{ error_message }}', errorMessage.zip);
      return $('.cart-shipping-calculator-response').html("<p>" + errorMessage + "</p>");
    };

    CartView.prototype.render = function() {
      if (Theme.shippingCalculator && Theme.customerLoggedIn && Theme.customerAddress.country.length) {
        return this.calculateShipping();
      }
    };

    return CartView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PostView = (function(superClass) {
    extend(PostView, superClass);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.events = {};

    PostView.prototype.initialize = function() {
      var highlight, i, len, ref;
      this.setFeaturedImage();
      this.artDirection();
      this.wrapAllNodes();
      ref = this.$('.highlight');
      for (i = 0, len = ref.length; i < len; i++) {
        highlight = ref[i];
        this.fixOverlappingElements($(highlight));
      }
      return $(window).resize((function(_this) {
        return function() {
          var j, len1, ref1, results;
          _this.setFeaturedImage(true);
          if (window.innerWidth > 1020) {
            ref1 = _this.$('.highlight');
            results = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              highlight = ref1[j];
              results.push(_this.fixOverlappingElements($(highlight)));
            }
            return results;
          }
        };
      })(this));
    };

    PostView.prototype.wrapAllNodes = function() {
      var childNodes, i, len, node, results;
      childNodes = this.$('.rte')[0].childNodes;
      results = [];
      for (i = 0, len = childNodes.length; i < len; i++) {
        node = childNodes[i];
        if (node.nodeType === 3 && node.textContent.replace(/^\s+|\s+$/g, "")) {
          results.push($(node).replaceWith("<p>" + node.textContent + "</p>"));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    PostView.prototype.fixOverlappingElements = function(highlight) {
      if (this.$('.post-meta').overlaps(highlight).length) {
        highlight.addClass('overlapping');
      }
      return highlight.addClass('processed');
    };

    PostView.prototype.setFeaturedImage = function(resize) {
      var contentWidth, featuredImage, parent, windowWidth;
      featuredImage = this.$('.featured-image');
      if (featuredImage.length) {
        parent = featuredImage.parent();
        windowWidth = $(window).width();
        contentWidth = this.$('.post-content').width();
        if (resize) {
          featuredImage.css({
            width: windowWidth,
            marginLeft: -(windowWidth - contentWidth) / 2
          });
          return;
        }
        featuredImage.detach().insertAfter('.page-title').css({
          width: windowWidth,
          marginLeft: -(windowWidth - contentWidth) / 2
        }).addClass('processed');
        if (parent.is(':empty')) {
          return parent.remove();
        }
      }
    };

    PostView.prototype.artDirection = function() {
      var images;
      images = this.$('.post-content').find('img');
      return images.imagesLoaded((function(_this) {
        return function() {
          var direction, i, image, imageAlt, imageParent, imageWidth, len, marginLeft, marginRight, results;
          results = [];
          for (i = 0, len = images.length; i < len; i++) {
            image = images[i];
            image = $(image);
            if (image.parent().hasClass('post-content')) {
              image.wrap('<div />');
            }
            imageParent = image.parent();
            if (image.css('float') !== 'none') {
              direction = image.css('float');
              imageParent.addClass("highlight highlight-" + direction);
              _this.fixOverlappingElements(imageParent);
            }
            imageWidth = image.width();
            imageAlt = image.attr('alt');
            if (imageAlt && imageAlt.length && imageParent.not('img')) {
              marginLeft = image.css('margin-left');
              marginRight = image.css('margin-right');
              results.push(imageParent.append("<div style='max-width: " + imageWidth + "px; margin-left: " + marginLeft + "; margin-right: " + marginRight + ";' class='photo-caption meta'>" + imageAlt + "</div>"));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this));
    };

    return PostView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.BlogView = (function(superClass) {
    extend(BlogView, superClass);

    function BlogView() {
      return BlogView.__super__.constructor.apply(this, arguments);
    }

    BlogView.prototype.events = {};

    BlogView.prototype.initialize = function() {
      var i, len, post, ref, results;
      ref = this.$('.blog-post');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        post = ref[i];
        results.push(new PostView({
          el: post
        }));
      }
      return results;
    };

    BlogView.prototype.render = function() {};

    return BlogView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.AddressesView = (function(superClass) {
    extend(AddressesView, superClass);

    function AddressesView() {
      return AddressesView.__super__.constructor.apply(this, arguments);
    }

    AddressesView.prototype.events = {
      'click .delete-address': 'deleteAddress',
      'click .edit-address': 'editAddress',
      'click .cancel-edit': 'cancelEditing',
      'click .toggle-new-address': 'toggleNewAddress',
      'change .select-wrapper select': 'updateSelectedText'
    };

    AddressesView.prototype.initialize = function() {
      return this.prepareAddresses();
    };

    AddressesView.prototype.prepareAddresses = function() {
      var address, addressID, addresses, i, j, len, len1, results, select, selectableOptions;
      new Shopify.CountryProvinceSelector('address-country', 'address-province', {
        hideElement: 'address-province-container'
      });
      addresses = this.$('.customer-address');
      if (addresses.length) {
        for (i = 0, len = addresses.length; i < len; i++) {
          address = addresses[i];
          addressID = $(address).data('address-id');
          new Shopify.CountryProvinceSelector("address-country-" + addressID, "address-province-" + addressID, {
            hideElement: "address-province-container-" + addressID
          });
        }
      }
      selectableOptions = this.$('.select-wrapper select');
      results = [];
      for (j = 0, len1 = selectableOptions.length; j < len1; j++) {
        select = selectableOptions[j];
        results.push(this.updateSelectedText(null, select));
      }
      return results;
    };

    AddressesView.prototype.updateSelectedText = function(e, select) {
      var addressID, selectedValue;
      select = e ? $(e.target) : $(select);
      selectedValue = select.find('option:selected').text();
      if (selectedValue !== '') {
        select.prev('.selected-text').text(selectedValue);
      }
      if (select.attr('name') === 'address[country]') {
        addressID = $(select).attr('id').split('address-country-')[1];
        addressID = addressID ? "#address-province-" + addressID : '.new-address-province';
        return this.updateSelectedText(null, $(addressID));
      }
    };

    AddressesView.prototype.deleteAddress = function(e) {
      var addressID;
      if (e) {
        e.preventDefault();
      }
      addressID = $(e.target).parents('[data-address-id]').data('address-id');
      return Shopify.CustomerAddress.destroy(addressID);
    };

    AddressesView.prototype.editAddress = function(e) {
      var addressID;
      if (e) {
        e.preventDefault();
      }
      addressID = $(e.currentTarget).parents('[data-address-id]').data('address-id');
      $(".customer-address[data-address-id='" + addressID + "']").addClass('editing');
      return $(".customer-address-edit-form[data-address-id='" + addressID + "']").addClass('show');
    };

    AddressesView.prototype.cancelEditing = function(e) {
      var addressID;
      if (e) {
        e.preventDefault();
      }
      addressID = $(e.target).parents('[data-address-id]').data('address-id');
      $(".customer-address[data-address-id='" + addressID + "']").removeClass('editing');
      return $(".customer-address-edit-form[data-address-id='" + addressID + "']").removeClass('show');
    };

    AddressesView.prototype.toggleNewAddress = function(e) {
      if (e) {
        e.preventDefault();
      }
      this.$('.add-new-address').toggle();
      return this.$('.customer-new-address').toggleClass('show');
    };

    AddressesView.prototype.render = function() {};

    return AddressesView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.AccountView = (function(superClass) {
    extend(AccountView, superClass);

    function AccountView() {
      return AccountView.__super__.constructor.apply(this, arguments);
    }

    AccountView.prototype.events = {
      'click .toggle-forgetfulness span': 'recoverPassword'
    };

    AccountView.prototype.initialize = function() {
      if ($(document.body).hasClass('template-customers-addresses')) {
        this.addressesView = new AddressesView({
          el: $('.main-content')
        });
      }
      if ($(document.body).hasClass('template-customers-login')) {
        this.checkForReset();
      }
      if (window.location.hash === '#recover') {
        this.recoverPassword();
      }
      this.mobilifyTables();
      return $(window).resize((function(_this) {
        return function() {
          return _this.mobilifyTables();
        };
      })(this));
    };

    AccountView.prototype.recoverPassword = function() {
      this.$('.recover-password').toggle();
      return this.$('.customer-login').toggle();
    };

    AccountView.prototype.checkForReset = function() {
      if ($('.reset-check').data('successful-reset') === true) {
        return $('.successful-reset').show();
      }
    };

    AccountView.prototype.mobilifyTables = function() {
      return this.$('.orders').mobileTable();
    };

    AccountView.prototype.render = function() {};

    return AccountView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.RTEView = (function(superClass) {
    extend(RTEView, superClass);

    function RTEView() {
      return RTEView.__super__.constructor.apply(this, arguments);
    }

    RTEView.prototype.events = {
      'click .tabs li': 'switchTabs',
      'change .select-wrapper select': 'updateOption'
    };

    RTEView.prototype.initialize = function() {
      var i, len, select, selects;
      this.setupTabs();
      selects = this.$el.find('select');
      for (i = 0, len = selects.length; i < len; i++) {
        select = selects[i];
        if (!$(select).parent('.select-wrapper').length) {
          $(select).wrap('<div class="select-wrapper" />').parent().prepend('<span class="selected-text"></span>');
        }
        this.updateOption(null, select);
      }
      this.$el.fitVids();
      this.mobilifyTables();
      return $(window).resize((function(_this) {
        return function() {
          return _this.mobilifyTables();
        };
      })(this));
    };

    RTEView.prototype.switchTabs = function(e) {
      var position, tab;
      tab = $(e.currentTarget);
      position = tab.index();
      this.tabs.removeClass('active');
      this.tabsContent.removeClass('active');
      tab.addClass('active');
      return this.tabsContent.eq(position).addClass('active');
    };

    RTEView.prototype.setupTabs = function() {
      this.tabs = this.$('.tabs > li');
      this.tabsContent = this.$('.tabs-content > li');
      this.tabs.first().addClass('active');
      return this.tabsContent.first().addClass('active');
    };

    RTEView.prototype.updateOption = function(e, selector) {
      var newOption, select;
      select = e ? $(e.target) : $(selector);
      newOption = select.find('option:selected').text();
      return select.siblings('.selected-text').text(newOption);
    };

    RTEView.prototype.mobilifyTables = function() {
      return this.$el.find('table').mobileTable();
    };

    return RTEView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.NotFoundView = (function(superClass) {
    extend(NotFoundView, superClass);

    function NotFoundView() {
      return NotFoundView.__super__.constructor.apply(this, arguments);
    }

    NotFoundView.prototype.events = {};

    NotFoundView.prototype.initialize = function() {};

    NotFoundView.prototype.render = function() {};

    return NotFoundView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.CurrencyView = (function(superClass) {
    extend(CurrencyView, superClass);

    function CurrencyView() {
      return CurrencyView.__super__.constructor.apply(this, arguments);
    }

    CurrencyView.prototype.events = {
      'change [name=currencies]': 'convertAll',
      'switch-currency': 'switchCurrency',
      'reset-currency': 'resetCurrency'
    };

    CurrencyView.prototype.initialize = function() {
      var doubleMoney, i, j, len, len1, money, ref, ref1;
      Currency.format = Theme.currencySwitcherFormat;
      Currency.money_with_currency_format[Theme.currency] = Theme.moneyFormatCurrency;
      Currency.money_format[Theme.currency] = Theme.moneyFormat;
      this.defaultCurrency = Theme.defaultCurrency || Theme.currency;
      this.cookieCurrency = Currency.cookie.read();
      if (this.cookieCurrency) {
        this.$("[name=currencies]").val(this.cookieCurrency);
      }
      ref = this.$('span.money span.money');
      for (i = 0, len = ref.length; i < len; i++) {
        doubleMoney = ref[i];
        $(doubleMoney).parents('span.money').removeClass('money');
      }
      ref1 = this.$('span.money');
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        money = ref1[j];
        $(money).attr("data-currency-" + Theme.currency, $(money).html());
      }
      this.switchCurrency();
      return this.$('.selected-currency').text(Currency.currentCurrency);
    };

    CurrencyView.prototype.resetCurrency = function() {
      var attribute, i, j, len, len1, money, ref, ref1, ref2;
      ref = this.$('span.money');
      for (i = 0, len = ref.length; i < len; i++) {
        money = ref[i];
        ref1 = $(money)[0].attributes;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          attribute = ref1[j];
          if (((ref2 = attribute.name) != null ? ref2.indexOf('data-') : void 0) > -1) {
            $(money).attr(attribute.name, '');
          }
        }
      }
      return this.switchCurrency();
    };

    CurrencyView.prototype.switchCurrency = function() {
      if (this.cookieCurrency === null) {
        if (Theme.currency === !this.defaultCurrency) {
          return Currency.convertAll(Theme.currency, this.defaultCurrency);
        } else {
          return Currency.currentCurrency = this.defaultCurrency;
        }
      } else if (this.$('[name=currencies]').size() && this.$('[name=currencies] option[value=' + this.cookieCurrency + ']').size() === 0) {
        Currency.currentCurrency = Theme.currency;
        return Currency.cookie.write(Theme.currency);
      } else if (this.cookieCurrency === Theme.currency) {
        return Currency.currentCurrency = Theme.currency;
      } else {
        return Currency.convertAll(Theme.currency, this.cookieCurrency);
      }
    };

    CurrencyView.prototype.convertAll = function(e, variant, selector) {
      var newCurrency;
      newCurrency = $(e.target).val();
      Currency.convertAll(Currency.currentCurrency, newCurrency);
      this.$('.selected-currency').text(Currency.currentCurrency);
      return this.cookieCurrency = newCurrency;
    };

    return CurrencyView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.GoogleMapView = (function(superClass) {
    extend(GoogleMapView, superClass);

    function GoogleMapView() {
      return GoogleMapView.__super__.constructor.apply(this, arguments);
    }

    GoogleMapView.prototype.initialize = function() {
      var mapAddress, mapTitle;
      this.geocoder = new google.maps.Geocoder;
      mapAddress = $("#map-canvas").data("address");
      mapTitle = $("#map-canvas").data("title");
      return this.geocoder.geocode({
        "address": mapAddress
      }, function(results, status) {
        var $mapTooltip, attr, infobox, map, mapOptions, marker, marker_height, marker_width, stylesArray;
        if (status === google.maps.GeocoderStatus.OK) {
          stylesArray = [
            {
              'featureType': 'administrative',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#444444'
                }
              ]
            }, {
              'featureType': 'landscape',
              'elementType': 'all',
              'stylers': [
                {
                  'color': '#f2f2f2'
                }
              ]
            }, {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            }, {
              'featureType': 'road',
              'elementType': 'all',
              'stylers': [
                {
                  'saturation': -100
                }, {
                  'lightness': 45
                }
              ]
            }, {
              'featureType': 'road.highway',
              'elementType': 'all',
              'stylers': [
                {
                  'visibility': 'simplified'
                }
              ]
            }, {
              'featureType': 'road.arterial',
              'elementType': 'labels.icon',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            }, {
              'featureType': 'transit',
              'elementType': 'all',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            }, {
              'featureType': 'water',
              'elementType': 'all',
              'stylers': [
                {
                  'color': '#419bf9'
                }, {
                  'visibility': 'on'
                }
              ]
            }
          ];
          mapOptions = {
            center: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            },
            zoom: 15,
            styles: stylesArray,
            scrollwheel: false
          };
          map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
          $mapTooltip = $(".module-map-tooltip");
          attr = $mapTooltip.attr("rel");
          marker_width = $mapTooltip.data("markerWidth");
          marker_height = $mapTooltip.data("markerHeight");
          if (attr && typeof attr !== void 0 && marker_width && typeof marker_width !== void 0 && marker_height && typeof marker_height !== void 0) {
            marker = new google.maps.Marker({
              optimized: false,
              position: mapOptions.center,
              icon: {
                url: $mapTooltip.attr("rel"),
                scaledSize: new google.maps.Size(marker_width, marker_height)
              }
            });
          } else {
            marker = new google.maps.Marker({
              position: mapOptions.center
            });
          }
          marker.setMap(map);
          if (marker_height && typeof marker_height !== void 0) {
            infobox = new InfoBox({
              content: "<div class='info-box-container'>" + mapTitle + "</div>",
              disableAutoPan: false,
              pixelOffset: new google.maps.Size(0, -110 - marker_height),
              zIndex: null,
              closeBoxURL: "",
              infoBoxClearance: new google.maps.Size(1, 1)
            });
          } else {
            infobox = new InfoBox({
              content: "<div class='info-box-container'>" + mapTitle + "</div>",
              disableAutoPan: false,
              pixelOffset: new google.maps.Size(0, -150),
              zIndex: null,
              closeBoxURL: "",
              infoBoxClearance: new google.maps.Size(1, 1)
            });
          }
          infobox.open(map, marker);
          google.maps.event.addListener(marker, 'click', function() {
            infobox.close(map, this);
          });
          return google.maps.event.addDomListener(window, 'resize', function() {
            return setTimeout((function(_this) {
              return function() {
                return map.setCenter(mapOptions.center);
              };
            })(this), 100);
          });
        }
      });
    };

    return GoogleMapView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ContentTogglerView = (function(superClass) {
    extend(ContentTogglerView, superClass);

    function ContentTogglerView() {
      return ContentTogglerView.__super__.constructor.apply(this, arguments);
    }

    ContentTogglerView.prototype.events = {
      "click .module-list-item-content-toggle-item-header": "toggle"
    };

    ContentTogglerView.prototype.toggle = function(e) {
      return $(e.currentTarget).parent().toggleClass("active");
    };

    return ContentTogglerView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.SelectView = (function(superClass) {
    extend(SelectView, superClass);

    function SelectView() {
      return SelectView.__super__.constructor.apply(this, arguments);
    }

    SelectView.prototype.events = {
      "change": "updateSelectText",
      "blur": "blurSelect",
      "focus": "focusSelect"
    };

    SelectView.prototype.initialize = function() {
      if (!(this.$el.parent(".select-wrapper").length || this.$el.hasClass("product-select"))) {
        this.$el.wrap("<div class='select-wrapper' />").parent().prepend("<span class='selected-text'></span>");
      }
      return this.updateSelectText();
    };

    SelectView.prototype.blurSelect = function() {
      return this.$el.parent(".select-wrapper").toggleClass("active", false);
    };

    SelectView.prototype.focusSelect = function() {
      return this.$el.parent(".select-wrapper").toggleClass("active", true);
    };

    SelectView.prototype.updateSelectText = function() {
      var newOption;
      newOption = this.$el.find("option:selected").text();
      return this.$el.siblings(".selected-text").text(newOption);
    };

    return SelectView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.TwitterView = (function(superClass) {
    extend(TwitterView, superClass);

    function TwitterView() {
      return TwitterView.__super__.constructor.apply(this, arguments);
    }

    TwitterView.prototype.initialize = function() {
      return this.fetchTweets();
    };

    TwitterView.prototype.fetchTweets = function() {
      var config;
      config = {
        "id": Theme.twitterId,
        "maxTweets": 1,
        "enableLinks": true,
        "showUser": true,
        "showTime": true,
        "showRetweet": Theme.twitterShowRetweets,
        "customCallback": this.renderTweets,
        "showInteraction": false
      };
      return twitterFetcher.fetch(config);
    };

    TwitterView.prototype.renderTweets = function(tweets) {
      var i, len, timestamp, tweet;
      if (tweets.length) {
        for (i = 0, len = tweets.length; i < len; i++) {
          tweet = tweets[i];
          tweet = $(tweet);
          this.$(".twitter-tweet").append(tweet);
        }
        return timestamp = this.$(".timePosted").text().split(" ");
      } else {
        $(".twitter-widget").remove();
        return console.log("No tweets to display. Most probable cause is an incorrectly entered Widget ID.");
      }
    };

    return TwitterView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.InstagramView = (function(superClass) {
    extend(InstagramView, superClass);

    function InstagramView() {
      return InstagramView.__super__.constructor.apply(this, arguments);
    }

    InstagramView.prototype.initialize = function() {
      return this.getInstagramImages();
    };

    InstagramView.prototype.getInstagramImages = function() {
      var instagramWidget, photoContainer, url;
      instagramWidget = this.$(".home-instagram");
      photoContainer = this.$(".instagram-photos");
      url = "https://api.instagram.com/v1/users/self/media/recent?access_token=" + Theme.instagramAccessToken + "&count=16&callback=";
      return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url,
        success: (function(_this) {
          return function(response) {
            var i, len, photo, ref, results;
            if (response.meta.code === 200) {
              ref = response.data;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                photo = ref[i];
                results.push(photoContainer.append("<a class='instagram-photo' target='_blank' href='" + photo.link + "'><img src='" + photo.images.low_resolution.url + "'/></a>"));
              }
              return results;
            } else {
              instagramWidget.remove();
              return console.log("Instagram error: " + response.meta.error_message);
            }
          };
        })(this),
        error: (function(_this) {
          return function(response) {
            instagramWidget.remove();
            return console.log("Instagram error: " + response.meta.error_message);
          };
        })(this)
      });
    };

    return InstagramView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.GiftCardView = (function(superClass) {
    extend(GiftCardView, superClass);

    function GiftCardView() {
      return GiftCardView.__super__.constructor.apply(this, arguments);
    }

    GiftCardView.prototype.initialize = function() {
      return this.addQrCode();
    };

    GiftCardView.prototype.addQrCode = function() {
      var qrWrapper;
      qrWrapper = $('[data-qr-code]');
      return new QRCode(qrWrapper[0], {
        text: qrWrapper.data('qr-code'),
        width: 120,
        height: 120
      });
    };

    return GiftCardView;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ThemeView = (function(superClass) {
    extend(ThemeView, superClass);

    function ThemeView() {
      return ThemeView.__super__.constructor.apply(this, arguments);
    }

    ThemeView.prototype.el = document.body;

    ThemeView.prototype.initialize = function() {
      var body, ref;
      body = $(document.body);
      this.isHome = body.hasClass('template-index');
      this.isCollection = body.hasClass('template-collection');
      this.isListCollections = body.hasClass('template-list-collections');
      this.isProduct = body.hasClass('template-product');
      this.isCart = body.hasClass('template-cart');
      this.isPage = body.hasClass('template-page');
      this.isPassword = body.hasClass('template-password');
      this.isBlog = body.hasClass('template-blog') || body.hasClass('template-article');
      this.isAccount = ((ref = body.attr('class')) != null ? ref.indexOf('-customers-') : void 0) > 0;
      this.is404 = body.hasClass('template-404');
      this.hasGoal = body.hasClass('has-goal-enabled');
      return this.isGiftCardPage = body.hasClass("gift-card-template");
    };

    ThemeView.prototype.render = function() {
      var j, len, ref, rte;
      if (!this.isPassword) {
        this.headerView = new HeaderView({
          el: $('[data-main-header]')
        });
        this.headerView.render();
        ref = $('.rte');
        for (j = 0, len = ref.length; j < len; j++) {
          rte = ref[j];
          this.rteView = new RTEView({
            el: rte
          });
        }
      }
      if (this.isHome) {
        this.homeView = new HomeView({
          el: this.$el
        });
        this.homeView.render();
      }
      if (this.isGiftCardPage) {
        this.giftcardView = new GiftCardView({
          el: this.$el
        });
      }
      if (this.isCollection) {
        this.collectionView = new CollectionView({
          el: this.$el
        });
        this.collectionView.render();
      }
      if (this.isListCollections) {
        this.listCollectionsView = new ListCollectionsView({
          el: $('.collections-list')
        });
        this.listCollectionsView.render();
      }
      if (this.isProduct) {
        this.productView = new ProductView({
          el: this.$el
        });
        this.productView.render();
      }
      if (this.isCart) {
        this.cartView = new CartView({
          el: this.$el
        });
        this.cartView.render();
      }
      if (this.isBlog) {
        this.blogView = new BlogView({
          el: this.$el
        });
        this.blogView.render();
      }
      if (this.isAccount) {
        this.accountView = new AccountView({
          el: this.$el
        });
        this.accountView.render();
      }
      if (this.is404) {
        this.notFoundView = new NotFoundView({
          el: this.$el
        });
        this.notFoundView.render();
      }
      if (this.isPassword) {
        this.passwordView = new PasswordView({
          el: this.$el
        });
      }
      if (Theme.currencySwitcher) {
        this.currencyView = new CurrencyView({
          el: this.$el
        });
      }
      if (Theme.twitter) {
        this.twitterView = new TwitterView({
          el: this.$('.twitter-widget')
        });
      }
      if (Theme.instagram) {
        this.instagramView = new InstagramView({
          el: this.$('.instagram-widget')
        });
      }
      if (this.hasGoal) {
        this.goal = new GoalView({
          el: this.$('.module-header-goal')
        });
      }
      if ($('html').hasClass('lt-ie10')) {
        this.inputPlaceholderFix();
      }
      if (this.$('.module-map').length) {
        this.googleMapView = new GoogleMapView({
          el: this.$el
        });
      }
      if (this.$('.module-list-item-content-toggle').length) {
        this.contentToggler = new ContentTogglerView({
          el: this.$el
        });
      }
      if (this.$('select').length) {
        return this.$('select').each((function(_this) {
          return function(i, item) {
            return new SelectView({
              el: $(item)
            });
          };
        })(this));
      }
    };

    ThemeView.prototype.inputPlaceholderFix = function() {
      var input, j, len, placeholders, text;
      placeholders = $('[placeholder]');
      for (j = 0, len = placeholders.length; j < len; j++) {
        input = placeholders[j];
        input = $(input);
        if (!(input.val().length > 0)) {
          text = input.attr('placeholder');
          input.attr('value', text);
          input.data('original-text', text);
        }
      }
      placeholders.focus(function() {
        input = $(this);
        if (input.val() === input.data('original-text')) {
          return input.val('');
        }
      });
      return placeholders.blur(function() {
        input = $(this);
        if (input.val().length === 0) {
          return input.val(input.data('original-text'));
        }
      });
    };

    return ThemeView;

  })(Backbone.View);

}).call(this);

(function() {
  $(function() {
    window.theme = new ThemeView();
    return theme.render();
  });

}).call(this);

$("#home-slide-1").click(function() {
  	//window.location.href = "http://orosapparel.com/pages/oros-technology";
});
$("#home-slide-2").click(function(){
	window.location.href = "http://www.orosapparel.com/products/orion-series-jacket-womens";
});

$(".message-header-close").click(function(){
  	hideMessageHeader();
  	setDisplayMessageHeader(false);
});

$( document ).ready(function() {
  if(storageAvailable("localStorage")){
    if(getDisplayMessageHeader())
      showMessageHeader();
  }
  else{
    console.error("Error: Local storage not available by browser");
  	showMessageHeader();
  }
});

function showMessageHeader(){
  console.log("showMessageHeader()");
  $(".message-header").removeClass("hidden");
  $(".header").addClass("showing-message-header");
  $("body").addClass("showing-message-header");
  $(".cart-preview").addClass("showing-message-header");
  $("#news-heading-bg").addClass("showing-message-header");
}

function hideMessageHeader(){
  	console.log("hideMessageHeader()");
	$(".message-header").addClass("hidden");
  	$(".header").removeClass("showing-message-header");
  	$("body").removeClass("showing-message-header");
    $(".cart-preview").removeClass("showing-message-header");
  	$("#news-heading-bg").removeClass("showing-message-header");
}

function getDisplayMessageHeader(){
  if(displayMessageHeaderStorageSet()){
  	return localStorage.getItem("displayMessageHeader") == true;
  }
  else{
  	return true;
  }
}

function setDisplayMessageHeader(display){
	if(storageAvailable("localStorage")){
    	localStorage.setItem("displayMessageHeader", display);
      	return true;
  	}
  	else{
  		// can not set storage as we can't access it
      	return false;
  	}
}

function displayMessageHeaderStorageSet(){
	return localStorage.getItem("displayMessageHeader") !== null;
}

// Helper function to see if either localStorage or sessionStorage is available
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}
/*
$(".add-to-cart-button").click(function() {
  $("#add-to-cart-notification").removeClass("hidden");
  setTimeout(function() {
    $("#add-to-cart-notification").addClass("hidden");
  }, 3500);
});
*/

$(".notification-close").click(function(){
	$(this).parent().addClass("hidden");
});
/* New Sub Navigation drop down */
$(".has-sub-dropdown").click(function(){
	$(this).toggleClass("dropdown-open");
  	$(this).find("[data-is-sub-dropdown]").toggleClass("dropdown-open");
});
/* New cart preview */
$("#cart-preview-close").click(function(){
	$(this).parent().addClass("hidden");
});
/* Product accordion */
$("#product-accordion .panel .panel-heading").click(function() {
  if($(this).find("a.icon").hasClass("icon-angle-down")){
  	$(this).find("a.icon").removeClass("icon-angle-down");
    $(this).find("a.icon").addClass("icon-angle-up");
  }
  else{
    $(this).find("a.icon").removeClass("icon-angle-up");
    $(this).find("a.icon").addClass("icon-angle-down");
  }
});
$(document).ready(function(){
  console.log("Ready");
  $("#product-accordion .panel .panel-collapse").each(function( index ) {
    if($(this).hasClass("in")){
    	$(this).closest(".panel").find('.panel-heading .panel-title .icon').removeClass("icon-angle-down");
    	$(this).closest(".panel").find('.panel-heading .panel-title .icon').addClass("icon-angle-up");
    }
  });
});