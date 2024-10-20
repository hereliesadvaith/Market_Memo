import { Error } from "./error/error";
import { Home } from "./home/home";
import { Header } from "./header/header";
import { Component, xml } from "@odoo/owl";

export class Layout extends Component {
  static components = { Error, Home, Header };

  static template = xml`
    <Header/>
    <Home/>
  `;
}
