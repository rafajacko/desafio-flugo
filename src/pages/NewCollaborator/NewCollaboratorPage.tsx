import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Shell } from "../../components/Shell/Shell";
import { collaboratorSchema, type CollaboratorFormValues } from "./schema";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { ProfessionalInfoStep } from "./steps/ProfessionalInfoStep";
import { createCollaborator } from "../../services/collaborators";

const steps = ["Infos Básicas", "Infos Profissionais"] as const;

export function NewCollaboratorPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [snack, setSnack] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  const methods = useForm<CollaboratorFormValues>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: {
      name: "",
      email: "",
      activeOnCreate: true,
      department: "",
    },
    mode: "onTouched",
  });

  const progress = useMemo(() => (activeStep === 0 ? 0 : 50), [activeStep]);

  async function next() {
    const ok =
      activeStep === 0
        ? await methods.trigger(["name", "email", "activeOnCreate"])
        : await methods.trigger(["department"]);

    if (!ok) return;
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    if (activeStep === 0) navigate("/");
    else setActiveStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    const ok = await methods.trigger();
    if (!ok) return;

    const v = methods.getValues();
    setSaving(true);

    try {
      await createCollaborator({
        name: v.name.trim(),
        email: v.email.trim().toLowerCase(),
        department: v.department,
        status: v.activeOnCreate ? "active" : "inactive",
      });

      setSnack({ type: "success", msg: "Colaborador cadastrado com sucesso!" });
      setTimeout(() => navigate("/"), 600);
    } catch {
      setSnack({ type: "error", msg: "Erro ao salvar." });
    } finally {
      setSaving(false);
    }
  }

  const primaryBtnSx = {
    px: 3,
    py: 1.2,
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 500,
    bgcolor: "#22C55E",
    color: "#FFFFFF",
    boxShadow: "none",
    "&:hover": { bgcolor: "#16A34A", boxShadow: "none" },
  } as const;

  return (
    <Shell
      title={
        activeStep === 0 ? "Informações Básicas" : "Informações Profissionais"
      }
      breadcrumb="Colaboradores • Cadastrar Colaborador"
    >
      <Stack spacing={4}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              flex: 1,
              height: 6,
              borderRadius: 999,
              bgcolor: "rgba(34,197,94,.12)",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#22C55E",
              },
            }}
          />
          <Typography sx={{ color: "#6B7280", fontSize: 13 }}>
            {progress}%
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
            gap: 4,
            alignItems: "start",
          }}
        >
          <Box sx={{ pt: 1 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ maxWidth: 720 }}>
            <FormProvider {...methods}>
              {activeStep === 0 ? <BasicInfoStep /> : <ProfessionalInfoStep />}
            </FormProvider>
          </Box>
        </Box>

        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="text"
            onClick={back}
            disabled={saving}
            sx={{ color: "#22C55E", textTransform: "none" }}
          >
            Voltar
          </Button>

          {activeStep === 0 ? (
            <Button sx={primaryBtnSx} onClick={next} disabled={saving}>
              Próximo
            </Button>
          ) : (
            <Button sx={primaryBtnSx} onClick={submit} disabled={saving}>
              {saving ? "Salvando..." : "Concluir"}
            </Button>
          )}
        </Stack>
      </Stack>

      <Snackbar
        open={!!snack}
        autoHideDuration={3500}
        onClose={() => setSnack(null)}
      >
        {snack ? <Alert severity={snack.type}>{snack.msg}</Alert> : <span />}
      </Snackbar>
    </Shell>
  );
}
