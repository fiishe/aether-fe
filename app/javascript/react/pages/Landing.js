import React from 'react';
import Page from './Page';
import LinkButton from '../components/LinkButton';

class Landing extends Page {
  render() {
    return(
      <div className="v-bar landing">
        {this.renderFlashes()}
        <h1>AetherFE</h1>
        <p>A FE simulator.</p>
        <br />
        <LinkButton to="/login" idName="login-button">
          Login with <img src="https://discordapp.com/assets/e7a3b51fdac2aa5ec71975d257d5c405.png" />
        </LinkButton>
      </div>
    )
  }
}

export default Landing
