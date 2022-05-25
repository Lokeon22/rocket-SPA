const routes = {
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/contact": "/pages/contact.html",
  404: "/pages/404.html",
};

function route(event) {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, "", event.target.href);

  handle();
  changeBg();
}

function handle() {
  const { pathname } = window.location;
  const route = routes[pathname] || routes[404];
  fetch(route)
    .then((data) => data.text())
    .then((html) => {
      document.querySelector("#app").innerHTML = html;
    });
}

handle();

function changeBg() {
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

changeBg();

window.onpopstate = () => handle();
