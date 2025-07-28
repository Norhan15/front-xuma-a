import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import HomePage from "./pages/Home/HomePage";
import AprendamosPage from "./pages/Aprendamos/AprendamosPage";
import AprendamosCategorias from "./components/Aprendamos/AprendamosCategorias";
import MediaByCategory from "./components/Media/MediaByCategory";
import EmailVerification from './TokenVerification/EmailVerification';
import MediaPage from "./pages/Media/MediaPage";
import MascotasPage from "./pages/Mascotas/MascotasPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PetEvolutionPanel from "./components/Mascotas/PetEvolutionPanel";
import Rankings from "./components/Dashboard/RankingsComponent";
import GlobalChallengeRankings from './components/Rankings/GlobalChallengeRankings';
import EnvironmentalImpactRankings from './components/Rankings/EnvironmentalImpactRankings';
import QuizRankings from './components/Rankings/QuizRankings';
import BadgesAdmin from './components/Badges/BadgesAdmin';
import ChallengesAdmin from './components/Challenges/ChallengesAdmin';
import TriviasPage from './components/Quiz/QuizView';
import TriviasCategorias from './components/Quiz/TriviasCategorias';
import QuizQuestions from './components/Quiz/QuizQuestions';
import ConsejosPage from "./pages/Consejos/ConsejosPage";
import UsuariosPage from "./pages/Usuarios/UsuariosPage";
import DesafiosPage from "./pages/Desafios/DesafiosPage";
import DashboardLayout from './layouts/DashboardLayout';
import Analytics from './components/Analitics/ChurnAnalysisVisualizations';

// Import AuthProvider and ProtectedRoute
import { AuthProvider } from './services/Auth/AuthContext'; // Adjust path as necessary
import ProtectedRoute from './services/Auth/ProtectedRoute'; // Adjust path as necessary

function App() {
  return (
    <Router>
      {/* Wrap the entire application with AuthProvider */}
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/confirm-email/:token" element={<EmailVerification />} />
          <Route path="/confirm-email" element={<EmailVerification />} />

          {/* Protected routes with sidebar layout */}
          <Route element={<ProtectedRoute allowedRoles={['administrator', 'moderator']} />}>
            <Route element={<DashboardLayout />}>
              {/* Routes accessible by both administrator and moderator */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/aprendamos" element={<AprendamosPage />} />
              <Route path="/aprendamos-categorias/:categoryId" element={<AprendamosCategorias />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/media/:category" element={<MediaByCategory />} />
              <Route path="/desafios" element={<DesafiosPage />} />
              <Route path="/consejos-diarios" element={<ConsejosPage />} />
              <Route path="/trivias" element={<TriviasPage />} />
              <Route path="/trivias-categorias/:categoryId" element={<TriviasCategorias />} />
              <Route path="/quiz-questions/:quizId" element={<QuizQuestions />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Route>

          {/* Routes accessible ONLY by administrator */}
          <Route element={<ProtectedRoute allowedRoles={['administrator']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/mascotas" element={<MascotasPage />} />
              <Route path="/admin/pets/evolution/:petId" element={<PetEvolutionPanel />} />
              <Route path="/estadisticas-completas" element={<DashboardPage />} />
              <Route path="/rankings-combinados" element={<Rankings />} />
              <Route path="/rankings/challenges/global" element={<GlobalChallengeRankings />} />
              <Route path="/rankings/challenges/environmental" element={<EnvironmentalImpactRankings />} />
              <Route path="/rankings/quizzes" element={<QuizRankings />} />
              <Route path="/rankings/quizzes/:type" element={<QuizRankings />} />
              <Route path="/badges" element={<BadgesAdmin />} />
              <Route path="/rankings/quizzes/age/:ageGroup" element={<QuizRankings />} />
              <Route path="/challenges" element={<ChallengesAdmin />} />
            </Route>
          </Route>

          {/* Fallback for unmatched routes - redirect to login if not authenticated, or home if authenticated */}
          <Route path="*" element={<ProtectedRoute allowedRoles={['administrator', 'moderator']} />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}
 
export default App;
