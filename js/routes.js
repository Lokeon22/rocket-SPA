export default class Router {
  routes = {};

  add(pageName, name) {
    this.routes[pageName] = name;
  }

  route(event) {
    event = window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
    this.changeBg();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then((res) => res.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }

  changeBg() {
    const { pathname } = window.location;
    const { body } = document;

    switch (pathname) {
      case "/about":
        body.className = "about-universe";
        break;

      case "/contact":
        body.className = "about-exploration";
        break;

      default:
        body.className = "";
        break;
    }
  }
}
