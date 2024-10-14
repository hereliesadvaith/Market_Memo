import { Component, onWillStart, mount, xml } from "@odoo/owl";

class Root extends Component {
  setup() {
    onWillStart(async () => {
      var result = await this.makeApiCall("/api/orm/strategy/1/", "GET");
      console.log(result);
    });
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
    <h1>Vite + OWL</h1>
`;
}

mount(Root, document.getElementById("root"));
