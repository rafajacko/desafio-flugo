import { Controller, useFormContext } from "react-hook-form";
import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import type { CollaboratorFormValues } from "../schema";

export function BasicInfoStep() {
  const { control } = useFormContext<CollaboratorFormValues>();

  return (
    <Box sx={{ display: "grid", gap: 2.2 }}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Título"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="E-mail"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      <Controller
        name="activeOnCreate"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={(_, v) => field.onChange(v)}
              />
            }
            label="Ativar ao criar"
          />
        )}
      />
    </Box>
  );
}
