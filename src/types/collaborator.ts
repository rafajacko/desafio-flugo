export type CollaboratorStatus = "active" | "inactive";

export type Collaborator = {
  id: string;
  name: string;
  email: string;
  department: string;
  status: CollaboratorStatus;
  createdAt: number;
};
