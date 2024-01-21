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
  ChevronDownIcon,
} from '@gluestack-ui/themed';

import { httpProtocolSelect } from '../helpers/constants';

const HttpProtocolSelect = ({ httpProtocol, setHttpProtocol }) => (
  <Select mr='$2' w='35%' onValueChange={(value) => setHttpProtocol(value)}>
    <SelectTrigger variant='outline' size='sm'>
      <SelectInput value={httpProtocol} />
      <SelectIcon mr='$3'>
        <Icon as={ChevronDownIcon} />
      </SelectIcon>
    </SelectTrigger>
    <SelectPortal>
      <SelectBackdrop />
      <SelectContent>
        <SelectDragIndicatorWrapper>
          <SelectDragIndicator />
        </SelectDragIndicatorWrapper>
        {httpProtocolSelect.map((item) => (
          <SelectItem key={item.value} label={item.label} value={item.value} />
        ))}
      </SelectContent>
    </SelectPortal>
  </Select>
);

export default HttpProtocolSelect;
