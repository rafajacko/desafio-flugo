import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logo2 from "../../assets/logo2.png";

type ShellProps = PropsWithChildren<{
  title?: string;
  breadcrumb?: string;
}>;

export function Shell({ children, title, breadcrumb }: ShellProps) {
  const location = useLocation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7F9",
        p: { xs: 2, sm: 3, md: 5 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1380,
          mx: "auto",
          minHeight: "92vh",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "#fff",
          boxShadow: "0 18px 40px rgba(17,24,39,.08)",
        }}
      >
        {/* Sidebar / Topbar */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            alignItems: { xs: "center", md: "stretch" },
            justifyContent: { xs: "space-between", md: "flex-start" },
            gap: { xs: 1.5, md: 2.5 },

            position: { xs: "sticky", md: "static" },
            top: 0,
            zIndex: 3,
            bgcolor: "#fff",
            borderBottom: { xs: "1px solid #F3F4F6", md: "none" },
          }}
        >
          {/* Logo (mantém como está - você disse que ela já faz a função de voltar) */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              userSelect: "none",
              width: "fit-content",
              outline: "none",
            }}
          >
            <Box
              component="img"
              src={logo2}
              alt="Flugo"
              sx={{
                height: { xs: 26, sm: 28, md: 30 },
                maxWidth: { xs: 140, sm: 160, md: 180 },
                width: "auto",
                objectFit: "contain",
                display: "block",
                flexShrink: 0,
              }}
            />
          </Box>

          {/* ✅ Desktop: "Colaboradores" embaixo da logo (apenas texto, não clicável) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              px: 1,
              py: 1,
              borderRadius: 1.5,
              color: "#6B7280",
              userSelect: "none",
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: 14 }}>Colaboradores</Typography>
            </Stack>

            <ChevronRightIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />
          </Box>

          {/* ✅ Mobile: mantém na topbar (direita) */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              color: "#6B7280",
              whiteSpace: "nowrap",
              display: { xs: "flex", md: "none" },
            }}
            component="nav"
            aria-label="Seção atual"
          >
            <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography
              component="span"
              sx={{ fontSize: { xs: 12, sm: 14 }, display: "block" }}
            >
              {location.pathname === "/" ? "Colaboradores" : title}
            </Typography>
          </Stack>
        </Box>

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            p: { xs: 2, md: 4 },
            minWidth: 0,
            "&:before": {
              content: '""',
              display: { xs: "none", md: "block" },
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
          <Box
            sx={{
              position: { xs: "static", md: "sticky" },
              top: { md: 0 },
              zIndex: 2,
              bgcolor: "#fff",
              pt: { xs: 0, md: 2 },
              pb: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Avatar sx={{ width: 34, height: 34 }} />
            </Box>

            {breadcrumb && (
              <Box component="nav" aria-label="Breadcrumb" sx={{ mb: 2 }}>
                <Typography
                  component="span"
                  sx={{ color: "#6B7280", fontSize: 13 }}
                >
                  {breadcrumb}
                </Typography>
              </Box>
            )}

            {title && (
              <Typography
                component="h1"
                sx={{
                  mb: 2,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.2px",
                  color: "#111827",
                }}
              >
                {title}
              </Typography>
            )}
          </Box>

          {children}
        </Box>
      </Paper>
    </Box>
  );
}
