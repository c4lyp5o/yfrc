import React from 'react';
import { Text } from '@gluestack-ui/themed';

const TextViewer = ({ textData }) => {
  const formatText = (text) => {
    return text.split(/(\n|\r)/).map((segment, index) => {
      return (
        <Text
          key={index}
          selectable={true}
          fontSize={12}
          color='$white'
          style={{ fontFamily: 'monospace' }}
        >
          {segment}
        </Text>
      );
    });
  };

  if (!textData)
    return (
      <Text
        selectable={true}
        fontSize={12}
        color='$green500'
        style={{ fontFamily: 'monospace' }}
      >
        No response data
      </Text>
    );

  return (
    <Text
      selectable={true}
      fontSize={12}
      color='$green500'
      style={{ fontFamily: 'monospace' }}
    >
      {formatText(textData)}
    </Text>
  );
};

export default TextViewer;
