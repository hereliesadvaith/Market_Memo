import { Component, mount, xml } from "@odoo/owl"


class Root extends Component {
  setup() {
    console.log('hii')
  }
  static template = xml`
    <h1>Vite + OWL</h1>
`;
}

mount(Root, document.getElementById('root'))
