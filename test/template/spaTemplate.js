import React from 'react';
import ReactDOM,{render} from 'react-dom';
import Apps from '../../page/<%= page %>.js';
const App=render(
    <Apps />,
  document.getElementById('<%= name %>_<%= page %>')
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
      ? container.querySelector('#<%= name %>_<%= page %>')
      : document.getElementById('<%= name %>_<%= page %>')
  );
}
