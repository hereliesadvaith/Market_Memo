import { Component, mount, useState, useSubEnv, xml } from "@odoo/owl";

class Root extends Component {
  setup() {
    this.state = useState({
      currentRoute: window.location.pathname
    })
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  handleRouteChange(ev) {
    ev.preventDefault();
    window.history.pushState({}, "", ev.target.href);
    this.state.currentRoute = window.location.pathname;
  }

  handlePopState() {
    this.state.currentRoute = window.location.pathname;
  }

  async makeApiCall(url, method, data = null) {
    var url = "http://localhost:8000" + url;
    const config = {
      method: method,
    };
    if (data && (method === "POST" || method === "PUT")) {
      config.body = JSON.stringify(data);
    }
    const response = await fetch(url, config);
    const result = await response.json()
    return result;
  }

  static template = xml`
    <h1><t t-esc='state.currentRoute'/></h1>
    <a href="/red" t-on-click="handleRouteChange">Red</a><br/>
    <a href="/blue" t-on-click="handleRouteChange">Blue</a>
`;
}

mount(Root, document.getElementById("root"));
