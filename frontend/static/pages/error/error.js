import { Component, xml } from "@odoo/owl";

export class Error extends Component {
  static template = xml`
    <div class="container">
        <h1>404 Page Not Found</h1>
    </div>
    `;
}
