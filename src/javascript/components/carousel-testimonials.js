class CarouselTestimonials {
  constructor(
    DOMCarouselSelector,
    DOMSliderSelector,
    DOMCarouselSingleSlide,
    DOMCarouselBtnPrevious,
    DOMCarouselBtnNext,
    sliderMarginLeftPx
  ) {
    // DOM selectors
    this.DOMCarouselSelector = DOMCarouselSelector;
    this.DOMCarouselSingleSlide = DOMCarouselSingleSlide;
    this.DOMSliderSelector = DOMSliderSelector;
    this.DOMCarouselBtnPrevious = DOMCarouselBtnPrevious;
    this.DOMCarouselBtnNext = DOMCarouselBtnNext;

    // DOM elements
    this.UICarousel = document.querySelector(this.DOMCarouselSelector);
    this.UISlides = this.UICarousel.querySelectorAll(
      this.DOMCarouselSingleSlide
    );
    this.UISlider = this.UICarousel.querySelector(this.DOMSliderSelector);
    this.UIBtnPrevious = this.UICarousel.querySelector(
      this.DOMCarouselBtnPrevious
    );
    this.UIBtnNext = this.UICarousel.querySelector(this.DOMCarouselBtnNext);

    // Utils
    this.utilSlidesWidthsArray = [];
    this.utilPositionFromLeftArray = [];
    this.utilSlidesTotalWidth = 0;
    this.currentSlideIndex = 0;

    this.sliderMarginLeftPx = sliderMarginLeftPx;
  }

  getSlidesWidth() {
    const slidesWidths = Array.from(this.UISlides).map(slide => {
      return slide.offsetWidth;
    });

    this.utilSlidesWidthsArray = slidesWidths;
    this.utilSlidesTotalWidth = this.utilSlidesWidthsArray.reduce(
      (total, slideWidth) => {
        return total + slideWidth;
      }
    );
  }

  calculateSlidesPositionsFromLeft() {
    const slidesFromLeftPositions = this.utilSlidesWidthsArray.map(
      (slideWidth, index, slidesArray) => {
        return slidesArray.slice(0, index + 1).reduce((total, current) => {
          return total + current;
        });
      }
    );
    // slides will start from 0 starting from left;
    slidesFromLeftPositions.unshift(0);
    this.utilPositionFromLeftArray = slidesFromLeftPositions;
  }

  positionSlidesInCarousel() {
    Array.from(this.UISlides).forEach((slide, index) => {
      console.log(slide);
      slide.style.left = `${this.utilPositionFromLeftArray[index] +
        this.sliderMarginLeftPx}px`;
    });
  }

  moveSlider(toSlideIndex) {
    this.UISlider.style.transform = `translateX(${this
      .utilPositionFromLeftArray[toSlideIndex] * -1}px)`;
  }

  nextSlideHandler() {
    this.UIBtnNext.addEventListener("click", () => {
      this.currentSlideIndex += 1;
      this.moveSlider(this.currentSlideIndex);
      console.log(this.currentSlideIndex);
    });
  }

  previousSlideHandler() {
    this.UIBtnPrevious.addEventListener("click", () => {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex -= 1;
        this.moveSlider(this.currentSlideIndex);
      }
    });
  }

  start() {
    this.getSlidesWidth();
    this.calculateSlidesPositionsFromLeft();
    this.calculateSlidesPositionsFromLeft();
    this.positionSlidesInCarousel();
    this.nextSlideHandler();
    this.previousSlideHandler();
  }
}

export default CarouselTestimonials;
