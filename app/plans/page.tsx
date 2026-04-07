import { PlansGrid } from "@/components/funnel/plans-grid";

export default function PlansPage({
  searchParams
}: {
  searchParams: { leadId?: string };
}) {
  return <PlansGrid initialLeadId={searchParams.leadId ?? null} />;
}
