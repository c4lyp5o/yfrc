import {
  Box,
  Input,
  InputField,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

const KeyValueInput = ({
  theKeys,
  theKey,
  theValue,
  updateKeys,
  updateValues,
  addKeyValue,
  removeKeyValue,
  index,
}) => {
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      w='100%'
      mb='$2'
    >
      <Input
        variant='outline'
        size='sm'
        h='$10'
        w='35%'
        mr='$2'
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          color='$green500'
          style={{ fontFamily: 'monospace' }}
          value={theKey}
          onChangeText={(text) => {
            updateKeys(index, text);
          }}
        />
      </Input>
      <Input
        variant='outline'
        size='sm'
        h='$10'
        w='35%'
        mr='$2'
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          color='$green500'
          style={{ fontFamily: 'monospace' }}
          value={theValue}
          onChangeText={(text) => {
            updateValues(index, text);
          }}
        />
      </Input>
      {index === theKeys.length - 1 && (
        <Box marginRight={4}>
          <Button bgColor='$green500' size='sm' onPress={addKeyValue}>
            <ButtonText color='$warmGray800'>+</ButtonText>
          </Button>
        </Box>
      )}
      {theKeys.length > 1 && (
        <Button
          bgColor='$red500'
          size='sm'
          onPress={() => removeKeyValue(index)}
        >
          <ButtonText color='$warmGray800'>-</ButtonText>
        </Button>
      )}
    </Box>
  );
};

export default KeyValueInput;
