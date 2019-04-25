import React from 'react';
import Page from './Page';
import LinkButton from '../components/LinkButton';

class NotFound extends Page {
  yield() {
    return(
      <div>
        <h1 id="error-code">404 yo!</h1>
        <br />
        <p>The page you were looking for could not be found.</p>
        <LinkButton to="/" text="< Home" />
      </div>
    )
  }
}

export default NotFound
