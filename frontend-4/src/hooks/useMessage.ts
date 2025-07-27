import { createContext, useContext } from 'react';
import type { PropsMessage } from '../context/Messages'; 

interface MessageContextType {
  alert: (props: PropsMessage) => void;
}

export const MessageContext = createContext<MessageContextType | null>(null);

export const useMessageAlert = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageAlert must be used within a MessageProvider");
  }
  return context;
};