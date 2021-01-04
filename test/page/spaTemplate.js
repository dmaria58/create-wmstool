import React from 'react';
import ReactDOM,{render} from 'react-dom';
import Apps from '../../page/&lt;%- page %&gt;.js';
const App=render(
    <Apps />,
  document.getElementById('&lt;%- name %&gt;_&lt;%- page %&gt;')
);

export async function mount(props = {}) {
  const {container} = props;
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector('#<%- name %>_<%- page %>')
      : document.getElementById('<%- name %>_<%- page %>')
  );
}

export async function unmount(props) {
  const {container} = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#&lt;%- name %&gt;_&lt;%- page %&gt;')
      : document.getElementById('&lt;%- name %&gt;_&lt;%- page %&gt;')
  );
}
