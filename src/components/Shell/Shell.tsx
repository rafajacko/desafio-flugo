import type { PropsWithChildren } from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logo2 from "../../assets/logo2.png";

type ShellProps = PropsWithChildren<{
  title?: string;
  breadcrumb?: string;
}>;

export function Shell({ children, title, breadcrumb }: ShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7F9",
        p: { xs: 2, md: 3 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1320,
          mx: "auto",
          minHeight: "92vh",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "#fff",
          boxShadow: "0 20px 45px rgba(17,24,39,.06)",
        }}
      >
        <Box
          sx={{
            pt: 3,
            px: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Stack direction="row" alignItems="center">
            <Box
              component="img"
              src={logo2}
              alt="Flugo"
              sx={{
                height: 28,
                width: "auto",
                display: "block",
              }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ color: "#6B7280", mt: 1 }}
          >
            <PersonOutlineIcon sx={{ fontSize: 18 }} />
            <Typography fontSize={14} fontWeight={500}>
              Colaboradores
            </Typography>

            <ChevronRightIcon
              sx={{ fontSize: 18, color: "#9CA3AF", ml: 0.5 }}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            px: { xs: 2, md: 5 },
            py: 3,
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundImage:
                "repeating-linear-gradient(to bottom, #E5E7EB 0 6px, transparent 6px 14px)",
              opacity: 0.9,
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <Avatar sx={{ width: 34, height: 34 }} />
          </Box>

          {breadcrumb && (
            <Typography sx={{ color: "#6B7280", fontSize: 13, mb: 1 }}>
              {breadcrumb}
            </Typography>
          )}

          {title && (
            <Typography
              sx={{
                mb: 3,
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "-0.3px",
                color: "#111827",
              }}
            >
              {title}
            </Typography>
          )}

          {children}
        </Box>
      </Paper>
    </Box>
  );
}
