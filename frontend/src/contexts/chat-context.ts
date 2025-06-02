import { createContext } from 'react';

export type ChatContextType = {
	currentChannel: string;
}

export const ChatContext = createContext<ChatContextType>({
	currentChannel: 'main',
});