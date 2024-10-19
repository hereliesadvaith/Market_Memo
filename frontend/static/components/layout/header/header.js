import { Component, xml } from "@odoo/owl";

export class Header extends Component {
  static template = xml`
    <div class="row p-3 mb-3 bg-white border-bottom box-shadow">
        <div class="col">
            <h5>Market Memo</h5>
        </div>

        <div class="col text-end">
            <a class="p-2 text-dark" href="#">Features</a>
            <a class="p-2 text-dark" href="#">Enterprise</a>
            <a class="p-2 text-dark" href="#">Support</a>
            <a class="p-2 text-dark" href="#">Pricing</a>
            <a class="btn btn-outline-primary" href="#">Sign up</a>
        </div>
    </div>
  `;
}
