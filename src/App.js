import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';

import AuthGuard from "./components/auth/AuthGuard";
import Router from "./Router";

export default function App() {
	return (
		<div className="App">
			<AuthGuard>
				<Router />
			</AuthGuard>
		</div>
	)
}
