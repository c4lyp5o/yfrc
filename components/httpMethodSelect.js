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

import { httpMethodSelect } from '../helpers/constants';

const HttpMethodSelect = ({ httpMethod, setHttpMethod }) => (
  <Select mr='$2' w='35%' onValueChange={(value) => setHttpMethod(value)}>
    <SelectTrigger variant='outline' size='sm'>
      <SelectInput value={httpMethod} />
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
        {httpMethodSelect.map((item) => (
          <SelectItem key={item.value} label={item.label} value={item.value} />
        ))}
      </SelectContent>
    </SelectPortal>
  </Select>
);

export default HttpMethodSelect;
