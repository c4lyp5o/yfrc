import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  Icon,
  GlobeIcon,
} from '@gluestack-ui/themed';

import { useShowToast } from '../hooks/useShowToast';

const HistorySelect = ({
  history,
  setUrl,
  setHttpMethod,
  setHttpProtocol,
  setRhKeys,
  setRhValues,
  setRqKeys,
  setRqValues,
  setBody,
  setIsExecuting,
}) => {
  const showToast = useShowToast();

  const extractKeysAndValues = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return [[], []];
    }
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    return [keys, values];
  };

  const handleSelect = async (id) => {
    try {
      const {
        url,
        method,
        protocol,
        headers = {},
        query = {},
        body,
      } = history.find((item) => item.id === id);
      setUrl(url);
      setHttpMethod(method);
      setHttpProtocol(protocol);

      const [headerKeys, headerValues] = extractKeysAndValues(headers);
      setRhKeys(headerKeys);
      setRhValues(headerValues);

      switch (method) {
        case 'GET':
          const [queryKeys, queryValues] = extractKeysAndValues(query);
          setRqKeys(queryKeys);
          setRqValues(queryValues);
          break;
        case 'POST':
        case 'PUT':
        case 'PATCH':
          setBody(body);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      showToast('Something went wrong');
    } finally {
      setIsExecuting(false);
    }
  };

  if (!history) return null;

  return (
    <Select mr='$2' w='20%' onValueChange={(value) => handleSelect(value)}>
      <SelectTrigger variant='outline' size='sm'>
        <SelectInput value={''} />
        <SelectIcon mr='$3'>
          <Icon as={GlobeIcon} size='xs' />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {history.map((item, index) => (
            <SelectItem key={index} label={item.url} value={item.id} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default HistorySelect;
