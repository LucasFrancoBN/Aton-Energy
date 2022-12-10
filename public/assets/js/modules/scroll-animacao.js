export default class ScrollAnima {
  constructor(articles) {
    this.articles = document.querySelectorAll(articles);
    this.alturaWindow = window.innerHeight * 0.6;

    this.checkDistance = this.checkDistance.bind(this);
  }

  getDistance() {
    this.distance = [...this.articles].map((article) => {
      const offset = article.offsetTop;
      return {
        element: article,
        offset: Math.floor(offset - this.alturaWindow),
      };
    });
  }

  checkDistance() {
    this.distance.forEach((item) => {
      if (window.scrollY > item.offset) {
        item.element.classList.add("animacao-scroll");
      }
    });
  }

  init() {
    if (this.articles.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener("scroll", this.checkDistance);
    }
    return this;
  }

  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}
