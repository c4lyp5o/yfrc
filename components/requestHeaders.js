import { Text, Box, Button, ButtonText } from '@gluestack-ui/themed';

import KeyValueInput from './keyValueInput';

const RequestHeaders = ({
  rhKeys,
  rhValues,
  addRhKeyValue,
  removeRhKeyValue,
  updateRhKeys,
  updateRhValues,
  clearRhKeys,
}) => {
  return (
    <>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        // justifyContent='center'
        w='100%'
        mt='$2'
      >
        <Text mr='$2' color='white' fontSize={10} fontFamily='monospace'>
          Headers
        </Text>
        <Button variant='outline' size='xs' onPress={clearRhKeys}>
          <ButtonText color='white'>Clear</ButtonText>
        </Button>
      </Box>
      {rhKeys.map((rhKey, index) => {
        return (
          <KeyValueInput
            key={index}
            theKeys={rhKeys}
            theKey={rhKey}
            theValue={rhValues[index]}
            updateKeys={updateRhKeys}
            updateValues={updateRhValues}
            removeKeyValue={removeRhKeyValue}
            addKeyValue={addRhKeyValue}
            index={index}
          />
        );
      })}
    </>
  );
};

export default RequestHeaders;
