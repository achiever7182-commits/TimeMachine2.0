import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CyberAuthTerminal } from "@/components/auth/CyberAuthTerminal";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Authenticate Operator — Incident Time Machine" },
      {
        name: "description",
        content: "Access the TimeMachine Cyber Incident Command Terminal.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === "ACTIVE") {
      navigate({ to: "/dashboard" });
    }
  }, [authState, navigate]);

  return (
    <CyberAuthTerminal
      onSuccess={() => {
        navigate({ to: "/dashboard" });
      }}
    />
  );
}
