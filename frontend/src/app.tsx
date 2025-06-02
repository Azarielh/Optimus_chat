import { Chat } from './components/chat';
import { Sidebar } from './components/sidebar';
import { ChatContext } from './contexts/chat-context';
import './style.css';

export function App() {
	return (
		<div className="flex w-screen h-screen">
			<ChatContext value={{ currentChannel: 'main' }}>
				<Sidebar />
				<Chat />
			</ChatContext>
		</div>
	)
}