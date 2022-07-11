import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';

import AuthGuard from "./components/auth/AuthGuard";
import Router from "./Router";

import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

export default function App() {
	return (
		<div className="App">
			<AuthGuard>
				<QueryClientProvider client={client}>
					<Router />
				</QueryClientProvider>
			</AuthGuard>
		</div>
	)
}
