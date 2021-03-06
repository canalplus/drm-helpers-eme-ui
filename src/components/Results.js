import React, { useState, useEffect } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { mediaCapabilitiesProber } from 'rx-player/experimental/tools';
import ReactJson from 'react-json-view';

import { BaseContainer } from './CommonStyles';

function Results({ configInput, error, shouldRefresh }) {
  const [supportedCombi, setSupportedCombi] = useState([]);
  const [handleError, setError] = useState(error);
  const [lastRetrieveDate, setLastRetrieve] = useState(null);

  if (error !== handleError) {
    setError(error);
  }

  useEffect(() => {
    if (configInput && Array.isArray(configInput)) {
      mediaCapabilitiesProber
        .getCompatibleDRMConfigurations(configInput)
        .then(drmValues => {
          const hasDrmValuesCompatibles = drmValues.filter(elem =>
            elem.hasOwnProperty('compatibleConfiguration')
          );
          setSupportedCombi(
            hasDrmValuesCompatibles.length
              ? hasDrmValuesCompatibles
              : `No Drm supported on the current browser: ${
                  navigator.userAgent
                }`
          );
          setLastRetrieve(`Last action done at: ${new Date().toTimeString()}`);
        })
        .catch(e => setError(e.message));
    }
    setSupportedCombi('Provide a good Array<object>');
  }, [handleError, configInput, shouldRefresh]);

  return (
    <BaseContainer>
      {lastRetrieveDate && <span>{lastRetrieveDate}</span>}
      <Segment placeholder>
        <Header icon>
          <Icon name="folder outline" />
          {handleError ? (
            handleError
          ) : Array.isArray(supportedCombi) && supportedCombi.length > 0 ? (
            <ReactJson
              src={supportedCombi}
              iconStyle="square"
              indentWidth="1"
              style={{ fontSize: 10, textAlign: 'left' }}
              displayDataTypes={false}
              shouldCollapse={({ name }) =>
                !(
                  name === 'root' ||
                  !isNaN(name) ||
                  name === 'compatibleConfiguration'
                )
              }
            />
          ) : (
            supportedCombi
          )}
        </Header>
      </Segment>
    </BaseContainer>
  );
}

export default Results;
