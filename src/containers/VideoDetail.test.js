import React from 'react';
import ReactDOM from 'react-dom';
import VideoDetail from './VideoDetail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VideoDetail />, div);
  ReactDOM.unmountComponentAtNode(div);
});
