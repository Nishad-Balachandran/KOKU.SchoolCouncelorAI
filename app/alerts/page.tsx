import { RiskAlertList } from "@/components/alerts/risk-alert-list";
import { AppShell } from "@/components/shared/app-shell";
import { getRiskAlerts } from "@/lib/db/queries";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function AlertsPage() {
  const user = await getCurrentUser();
  const alerts = await getRiskAlerts();

  return (
    <AppShell user={user} title="Alerts" subtitle="Explainable risk queue with human review checkpoints.">
      <RiskAlertList alerts={alerts} />
    </AppShell>
  );
}
