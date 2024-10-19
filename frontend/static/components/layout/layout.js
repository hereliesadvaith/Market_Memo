import { Error } from "./error/error";
import { Home } from "./home/home";
import { Header } from "./header/header";
import { Component, xml } from "@odoo/owl";

export class Layout extends Component {
  setup() {}

  static template = xml`
        <Header/>
        <Home/>
    `;
  static components = { Error, Home, Header };
}
