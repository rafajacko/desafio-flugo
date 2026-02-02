import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Shell } from "../../components/Shell/Shell";
import { listCollaborators } from "../../services/collaborators";
import type { Collaborator } from "../../types/collaborator";

export function CollaboratorsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const items = await listCollaborators();
      setData(items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const rows = useMemo(() => data, [data]);

  const headerCellSx = {
    bgcolor: "#F9FAFB",
    color: "#6B7280",
    fontWeight: 600,
    fontSize: "13px",
    py: 2,
    borderBottom: "1px solid #E5E7EB",
  } as const;

  return (
    <Shell title="Colaboradores">
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/novo")}
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            bgcolor: "#22C55E",
            color: "#FFFFFF",
            boxShadow: "none",
            "&:hover": { bgcolor: "#16A34A", boxShadow: "none" },
          }}
        >
          Novo Colaborador
        </Button>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #F3F4F6",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        {loading ? (
          <Box sx={{ p: 7, display: "grid", placeItems: "center" }}>
            <CircularProgress size={30} />
          </Box>
        ) : rows.length === 0 ? (
          <Box sx={{ p: 7 }}>
            <Typography
              sx={{ fontSize: 16, fontWeight: 600, color: "#111827" }}
            >
              Nenhum colaborador cadastrado
            </Typography>
            <Typography sx={{ mt: 1, fontSize: 14, color: "#6B7280" }}>
              Clique em “Novo Colaborador” para adicionar o primeiro.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...headerCellSx, pl: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>Nome</span>
                    <span style={{ fontSize: 14, color: "#9CA3AF" }}>↓</span>
                  </Stack>
                </TableCell>

                <TableCell sx={headerCellSx}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>Email</span>
                    <span style={{ fontSize: 14, color: "#9CA3AF" }}>↓</span>
                  </Stack>
                </TableCell>

                <TableCell sx={headerCellSx}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>Departamento</span>
                    <span style={{ fontSize: 14, color: "#9CA3AF" }}>↓</span>
                  </Stack>
                </TableCell>

                <TableCell align="right" sx={{ ...headerCellSx, pr: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <span>Status</span>
                    <span style={{ fontSize: 14, color: "#9CA3AF" }}>↓</span>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((c) => (
                <TableRow
                  key={c.id}
                  hover
                  sx={{ "&:last-child td": { border: 0 } }}
                >
                  <TableCell sx={{ pl: 3, py: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, fontSize: 14 }} />
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        color="#111827"
                      >
                        {c.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ color: "#4B5563", fontSize: "14px" }}>
                    {c.email}
                  </TableCell>
                  <TableCell sx={{ color: "#4B5563", fontSize: "14px" }}>
                    {c.department}
                  </TableCell>

                  <TableCell align="right" sx={{ pr: 3 }}>
                    <Chip
                      size="small"
                      label={c.status === "active" ? "Ativo" : "Inativo"}
                      sx={{
                        height: 24,
                        borderRadius: "6px",
                        fontWeight: 500,
                        fontSize: "12px",
                        bgcolor: c.status === "active" ? "#DCFCE7" : "#FEE2E2",
                        color: c.status === "active" ? "#16A34A" : "#DC2626",
                        "& .MuiChip-label": { px: 1.5 },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Shell>
  );
}
