import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import type { Collaborator } from "../types/collaborator";

const COL = "collaborators";

export type CreateCollaboratorInput = {
  name: string;
  email: string;
  department: string;
  status: "active" | "inactive";
};

export async function createCollaborator(input: CreateCollaboratorInput) {
  await addDoc(collection(db, COL), {
    ...input,
    createdAt: Date.now(),
  });
}

export async function listCollaborators(): Promise<Collaborator[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data() as Omit<Collaborator, "id">;
    return { id: d.id, ...data };
  });
}
