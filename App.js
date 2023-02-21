import { StatusBar } from 'expo-status-bar';

// CONTEXT
import { AuthProvider } from "./src/context/AuthContext";

// ROUTER
import MainRouter from "./src/routes/MainRouter";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <MainRouter/>
    </AuthProvider>
  );
}
