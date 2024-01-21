import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  VStack,
} from '@gluestack-ui/themed';

export function useShowToast() {
  const toast = useToast();

  const showToast = (message) => {
    toast.show({
      placement: 'bottom',
      duration: 1000,
      render: ({ id }) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action='info' variant='solid'>
            <VStack space='xs'>
              <ToastDescription>{message}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return showToast;
}
