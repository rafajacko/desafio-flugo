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
  TableContainer,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Shell } from "../../components/Shell/Shell";
import { listCollaborators } from "../../services/collaborators";
import type { Collaborator } from "../../types/collaborator";

type SortField = "name" | "email" | "department" | "status";
type SortOrder = "asc" | "desc";

export function CollaboratorsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

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

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (field !== sortField) {
      return <span style={{ fontSize: 14, color: "#9CA3AF" }}>↓</span>;
    }

    return sortOrder === "asc" ? (
      <ArrowUpwardIcon sx={{ fontSize: 16, color: "#111827" }} />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: 16, color: "#111827" }} />
    );
  }

  const rows = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = (a[sortField] ?? "").toString().toLowerCase();
      const bValue = (b[sortField] ?? "").toString().toLowerCase();

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortField, sortOrder]);

  const headerCellSx = {
    bgcolor: "#F9FAFB",
    color: "#6B7280",
    fontWeight: 600, 
    fontSize: "13px",
    py: 2,
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
  } as const;

  return (
    <Shell title="Colaboradores">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,

          position: { xs: "static", md: "sticky" },
          top: { md: 86 },
          zIndex: 1,
          bgcolor: { md: "#fff" },
          py: { md: 1 },
        }}
      >
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
      </Box>

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
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
              Nenhum colaborador cadastrado
            </Typography>
            <Typography sx={{ mt: 1, fontSize: 14, color: "#6B7280" }}>
              Clique em “Novo Colaborador” para adicionar o primeiro.
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 520 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...headerCellSx, pl: 3 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleSort("name")}
                    >
                      <span>Nome</span>
                      <SortIcon field="name" />
                    </Stack>
                  </TableCell>

                  <TableCell sx={headerCellSx}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleSort("email")}
                    >
                      <span>Email</span>
                      <SortIcon field="email" />
                    </Stack>
                  </TableCell>

                  <TableCell sx={headerCellSx}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleSort("department")}
                    >
                      <span>Departamento</span>
                      <SortIcon field="department" />
                    </Stack>
                  </TableCell>

                  <TableCell align="right" sx={{ ...headerCellSx, pr: 3 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="flex-end"
                      sx={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleSort("status")}
                    >
                      <span>Status</span>
                      <SortIcon field="status" />
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((c) => (
                  <TableRow key={c.id} hover sx={{ "&:last-child td": { border: 0 } }}>
                    <TableCell sx={{ pl: 3, py: 2 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, fontSize: 14 }} />
                        <Typography variant="body2" fontWeight={500} color="#111827">
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
          </TableContainer>
        )}
      </Paper>
    </Shell>
  );
}
