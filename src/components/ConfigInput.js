import React, { useState, useEffect } from 'react';
import {
  Form,
  TextArea,
  Button,
  Select,
  Loader,
  Icon,
  Popup,
} from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { BaseContainer } from './CommonStyles';

function ConfigInput({ getConfigInputState, preDefinedConfig }) {
  const [configInput, setConfigInput] = useState({ value: '', from: '' });
  const [copyState, paste] = useState(false);
  let timerID = null;

  useEffect(() => {
    if (timerID) {
      clearTimeout(timerID);
    }
  }, []);

  const getOnInput = (_, { value }) => {
    setConfigInput({ value, from: 'input' });
  };

  const submitConfig = () => {
    getConfigInputState(configInput);
  };

  const selectDefinedConfig = (_, { value }) => {
    setConfigInput({ value, from: 'definedConfig' });
  };

  const onCopy = () => {
    paste(true);
    timerID = setTimeout(paste, 2000, false);
  };

  const valueJSON =
    configInput.from === 'definedConfig' && configInput.value !== ''
      ? JSON.stringify(configInput.value, undefined, 2)
      : configInput.value;
  // Props may warn cause we are passing an Array as value, but is not a big deal!
  return (
    <BaseContainer>
      {preDefinedConfig === 'loading' ? (
        <Loader active inline="centered" />
      ) : (
        <>
          <Select
            placeholder="Pre defined config"
            options={[
              { key: 0, text: 'Custom config', value: '' },
              ...preDefinedConfig,
            ]}
            style={{ marginBottom: 10, minWidth: '16em' }}
            onChange={selectDefinedConfig}
          />
          <Popup
            trigger={
              <CopyToClipboard text={valueJSON} onCopy={onCopy}>
                <Icon
                  circular
                  inverted
                  color="orange"
                  name="paste"
                  link
                  style={{ marginLeft: 20 }}
                />
              </CopyToClipboard>
            }
            content="Copy!"
          />
          {copyState && (
            <span style={{ color: 'green', position: 'absolute' }}>
              Copied!
            </span>
          )}
        </>
      )}
      <Form onSubmit={submitConfig}>
        <TextArea
          disabled={
            configInput.from === 'definedConfig' && configInput.value !== ''
          }
          placeholder="Your MediaKeySystemConfiguration"
          style={{ minHeight: 300 }}
          onChange={getOnInput}
          value={valueJSON}
        />
        <Button type="submit" style={{ marginTop: 20 }}>
          Test your current config!
        </Button>
      </Form>
    </BaseContainer>
  );
}

export default ConfigInput;
