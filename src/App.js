import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

import { dependencies } from '../package.json';
import ConfigInput from './components/ConfigInput';
import Results from './components/Results';
const contentful = require('contentful');

const Body = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px 20px;
`;

const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

function App() {
  const [configInput, setConfigInput] = useState('');
  const [preDefinedConfig, setDefinedConfig] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    client
      .getEntry('4gkBaVbwoQeA1IagDESW5E')
      .then(entry => setDefinedConfig(entry.fields.mediaKeySystemConfiguration))
      .catch(setError);
  }, []);

  const getConfigInput = data => {
    setError('');
    try {
      setConfigInput(
        data.from === 'definedConfig' ? data.value : JSON.parse(data.value)
      );
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Drm Environment Helpers - Canal+</h1>
        <p>
          Using <code>mediaCapabilitiesProber</code> from{' '}
          <span style={{ fontWeight: 'bold', color: 'red' }}>
            rx-player ({dependencies['rx-player']})
          </span>
        </p>
        <hr className="separator" />
      </header>
      <Body>
        <ConfigInput
          getConfigInputState={getConfigInput}
          preDefinedConfig={preDefinedConfig}
        />
        <Results configInput={configInput} error={error} />
      </Body>
    </div>
  );
}

export default App;
