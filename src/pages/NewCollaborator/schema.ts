import { z } from "zod";

export const collaboratorSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
  email: z.string().min(1, "Informe o e-mail").email("E-mail inválido"),
  activeOnCreate: z.boolean(),
  department: z.string().min(1, "Selecione um departamento"),
});

export type CollaboratorFormValues = z.infer<typeof collaboratorSchema>;
