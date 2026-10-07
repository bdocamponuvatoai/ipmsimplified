import { fixtures as f } from "@/content/fixtures";
import { products, type ProductSlug } from "@/content/products";
import { SampleLabel, StatusPill } from "@/components/ui";
import { StatusFlip } from "@/components/motion/StatusFlip";
export function RecordCard({
  product,
  animate = false,
}: {
  product: ProductSlug;
  animate?: boolean;
}) {
  const p = products.find((p) => p.slug === product);
  return (
    <div className="record-card">
      <div className="record-card-header">
        <strong>{p?.name}</strong>
        <SampleLabel />
      </div>
      {product === "inspection" ? (
        <>
          <p>{f.heroCitation}</p>
          {animate ? (
            <StatusFlip />
          ) : (
            <div className="record-details">
              <p>Next due {f.nextDue}</p>
              <StatusPill status="Pass" />
            </div>
          )}
        </>
      ) : product === "permit" ? (
        <>
          <p>{f.permit} · alarm</p>
          <div className="record-details">
            <p>Permit issued</p>
            <StatusPill status="Closed out" />
          </div>
        </>
      ) : (
        <>
          <p>Certificate on file</p>
          <div className="record-details">
            <p>{f.deficiencies} deficiencies open</p>
            <p>Correct by {f.correctBy}</p>
          </div>
        </>
      )}
    </div>
  );
}
