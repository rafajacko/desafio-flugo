import { Routes, Route } from "react-router-dom";
import { CollaboratorsPage } from "./pages/Collaborators/CollaboratorsPage";
import { NewCollaboratorPage } from "./pages/NewCollaborator/NewCollaboratorPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CollaboratorsPage />} />
      <Route path="/novo" element={<NewCollaboratorPage />} />
    </Routes>
  );
}
