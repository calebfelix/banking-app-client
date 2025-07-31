import toast from 'react-hot-toast';

export const MessageSuccess = (message) => {
  toast.success(message, {position:"bottom-left"})
};

export const MessageError = (message) => {
  toast.error(message, {position:"bottom-left"})
};

export const MessageWarning = (message) => {
};

export const MessageInfo = (message) => {
};
