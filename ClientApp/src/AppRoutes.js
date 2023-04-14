import { HomePage } from "./pages/HomePage";
import { JobsPage } from "./pages/Jobs";

const AppRoutes = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: '/admin/jobs',
    element: <JobsPage />

  }

];

export default AppRoutes;
