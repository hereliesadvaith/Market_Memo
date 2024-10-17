import { Login } from "./pages/login/login";
import {
  Component,
  mount,
  onWillStart,
  useExternalListener,
  useState,
  useSubEnv,
  xml,
} from "@odoo/owl";

class Root extends Component {
  setup() {
    this.state = useState({
      currentRoute: window.location.pathname,
    });
    useExternalListener(window, "popstate", this.handlePopState.bind(this));
    useSubEnv({
      services: {
        api: this.makeApiCall,
        setCookie: this.setCookie,
      },
    });
    var authTokens = JSON.parse(this.getCookie("authTokens"));
    if (authTokens) {
      var auth = jwt_decode(authTokens.access);
      useSubEnv({
        uid: auth.user_id,
      });
    }
    onWillStart(async () => {
      if (authTokens) {
        await this.refreshCookie(authTokens);
      }
    });
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
    var config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data && (method === "POST" || method === "PUT")) {
      config.body = JSON.stringify(data);
    }
    var response = await fetch(url, config);
    var result = await response.json();
    return result;
  }

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      expires +
      "; path=/; Secure; SameSite=Strict";
  }

  getCookie(name) {
    var value = `; ${document.cookie}`;
    var parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(";").shift());
    }
    return null;
  }

  async refreshCookie(authTokens) {
    var url = "http://localhost:8000" + "/api/token/refresh/";
    var config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    };
    var response = await fetch(url, config);
    var result = await response.json();
    result["refresh"] = authTokens.refresh;
    this.setCookie("authTokens", JSON.stringify(result), 90);
  }

  static template = xml`
    <t t-if="state.currentRoute == '/'">
      <h1>Vite + Owl + Django</h1>
      <a href="/login">Login</a>
    </t>
    <t t-else="">
      <Login/>
    </t>
`;

  static components = { Login };
}

mount(Root, document.getElementById("root"));
