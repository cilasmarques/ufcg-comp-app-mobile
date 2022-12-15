import MainRouter from "./src/routes/MainRouter";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <MainRouter/>
    </AuthProvider>
  );
}
