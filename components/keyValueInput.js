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
      // justifyContent='center'
      w='100%'
      mb='$1'
    >
      <Input
        variant='underlined'
        size='sm'
        h='$10'
        w='35%'
        mr='$2'
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          color='white'
          fontSize={12}
          fontFamily='monospace'
          value={theKey}
          onChangeText={(text) => {
            updateKeys(index, text);
          }}
        />
      </Input>
      <Input
        variant='underlined'
        size='sm'
        h='$10'
        w='35%'
        mr='$2'
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          color='white'
          fontSize={12}
          fontFamily='monospace'
          value={theValue}
          onChangeText={(text) => {
            updateValues(index, text);
          }}
        />
      </Input>
      {index === theKeys.length - 1 && (
        <Box marginRight={4}>
          <Button variant='outline' size='sm' onPress={addKeyValue}>
            <ButtonText color='white' fontWeight='$extrabold'>
              +
            </ButtonText>
          </Button>
        </Box>
      )}
      {theKeys.length > 1 && (
        <Button
          Button
          variant='outline'
          size='sm'
          onPress={() => removeKeyValue(index)}
        >
          <ButtonText color='white' fontWeight='$extrabold'>
            -
          </ButtonText>
        </Button>
      )}
    </Box>
  );
};

export default KeyValueInput;
