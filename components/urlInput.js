import {
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonSpinner,
} from '@gluestack-ui/themed';

const UrlInput = ({ url, setUrl, executeCall, isExecuting }) => (
  <>
    <Input
      variant='outline'
      size='sm'
      h='$10'
      w='85%'
      marginRight='$2'
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
    >
      <InputField
        style={{ fontFamily: 'monospace' }}
        fontSize={12}
        value={url}
        onChangeText={(text) => setUrl(text.toLocaleLowerCase())}
      />
      {url ? (
        <Button
          onPress={() => setUrl('')}
          size='sm'
          variant='outline'
          w='15%'
          h='100%'
          action='primary'
        >
          <ButtonText size='sm' color='$black'>
            X
          </ButtonText>
        </Button>
      ) : null}
    </Input>
    <Button
      size='sm'
      w='12%'
      variant='solid'
      action='primary'
      isDisabled={isExecuting}
      isFocusVisible={false}
      onPress={executeCall}
    >
      {isExecuting ? (
        <ButtonSpinner size='small' />
      ) : (
        <ButtonText>&gt;</ButtonText>
      )}
    </Button>
  </>
);

export default UrlInput;
