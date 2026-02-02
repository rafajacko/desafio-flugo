import { Controller, useFormContext } from "react-hook-form";
import { Box, MenuItem, TextField } from "@mui/material";
import type { CollaboratorFormValues } from "../schema";

const departments = ["Design", "TI", "Marketing", "Produto"];

export function ProfessionalInfoStep() {
  const { control } = useFormContext<CollaboratorFormValues>();

  return (
    <Box sx={{ display: "grid", gap: 2.2 }}>
      <Controller
        name="department"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            select
            label="Selecione um departamento"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputLabelProps={{ shrink: true }}
          >
            {departments.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
}
