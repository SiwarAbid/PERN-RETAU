import React from 'react';
import { message } from 'antd';
import type { NoticeType } from 'antd/es/message/interface';
import { MessageContext } from '../hooks/useMessage';

export interface PropsMessage {
  typeMsg: NoticeType;
  messageContent: string;
}
  
export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const alert = ({ typeMsg, messageContent }: PropsMessage) => {
    messageApi.open({
      type: typeMsg,
      content: messageContent,
    });
  };

  return (
    <MessageContext.Provider value={{ alert }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
