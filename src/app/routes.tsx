import { createBrowserRouter } from "react-router-dom";
import { CollaboratorsPage } from "../pages/Collaborators/CollaboratorsPage";
import { NewCollaboratorPage } from "../pages/NewCollaborator/NewCollaboratorPage";

export const router = createBrowserRouter([
  { path: "/", element: <CollaboratorsPage /> },
  { path: "/novo", element: <NewCollaboratorPage /> },
]);
