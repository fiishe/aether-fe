import React from 'react';
import Page from './Page';
import LinkButton from '../components/LinkButton';

class NotFound extends Page {
  yield() {
    return(
      <div className="panel row">
        <div id="error-container">
          <h1>404 yo!</h1>
        </div>
        <br />
        <p>The page you were looking for could not be found.</p>
        <LinkButton to="/" text="< Home" />
      </div>
    )
  }
}

export default NotFound
