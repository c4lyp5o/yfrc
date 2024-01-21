import { Text, Box, Button, ButtonText } from '@gluestack-ui/themed';

import KeyValueInput from './keyValueInput';

const RequestQuery = ({
  rqKeys,
  rqValues,
  updateKeys,
  updateValues,
  removeKeyValue,
  addKeyValue,
  clearKeys,
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
          Query
        </Text>
        <Button variant='outline' size='xs' onPress={clearKeys}>
          <ButtonText color='white'>Clear</ButtonText>
        </Button>
      </Box>
      {rqKeys.map((theKey, index) => {
        return (
          <KeyValueInput
            key={index}
            theKeys={rqKeys}
            theKey={theKey}
            theValue={rqValues[index]}
            updateKeys={updateKeys}
            updateValues={updateValues}
            removeKeyValue={removeKeyValue}
            addKeyValue={addKeyValue}
            index={index}
          />
        );
      })}
    </>
  );
};

export default RequestQuery;
