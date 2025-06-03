import { Chat } from './components/chat';
import { Sidebar } from './components/sidebar';
import { ChatContextProvider } from './contexts/chat-context';
import './style.css';

export function App() {
	return (
		<div className="flex w-screen h-screen">
			<ChatContextProvider>
				<Sidebar />
				<Chat />
			</ChatContextProvider>
		</div>
	)
}