import { alt } from "@/content/alt";
import { SampleLabel } from "@/components/ui";
import { ContractorPhone } from "./ContractorPhone";
import { OwnerPortfolio } from "./OwnerPortfolio";
export function Maintenance() {
  return (
    <figure className="mockup" aria-label={alt.maintenance}>
      <div className="mockup-head">
        <strong>The record both sides keep</strong>
        <SampleLabel />
      </div>
      <div className="maintenance-body">
        <ContractorPhone />
        <OwnerPortfolio />
      </div>
    </figure>
  );
}
