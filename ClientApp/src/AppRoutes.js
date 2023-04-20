import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";

import HomePage from "./pages/HomePage";
import CreateJobsPage from "./pages/Job/CreateJob";
import EditJobPages from "./pages/Job/EditJob";
import { JobsPage } from "./pages/Job/Jobs";
import CategoryPage from "./pages/admin/Category";
import CategoriesPage from "./pages/admin/Category";
import SubCategoryPage from "./pages/admin/SubCategory";
import { Rest } from "./pages/admin/create";

const AppRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/:userType/jobs",
    element: <JobsPage />,
  },
  {
    path: "/admin/create",
    element: <CreateJobsPage />,
  },
  {
    path: "/admin/category",
    element: <CategoryPage />,
  },
  {
    path: "/admin/subcategory",
    element: <SubCategoryPage />,
  },
  {
    path: "/admin/edit/:id",
    element: <EditJobPages />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default AppRoutes;
