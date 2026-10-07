import { fixtures as f } from "@/content/fixtures";
import { alt } from "@/content/alt";
import { SampleLabel, StatusPill } from "@/components/ui";
export function RegisterTable({ compact = false }: { compact?: boolean }) {
  return (
    <figure className="mockup" aria-label={alt.register}>
      <div className="mockup-head">
        <strong>{f.jurisdiction}</strong>
        <SampleLabel />
      </div>
      <div className="register-body">
        {!compact && (
          <div className="mock-sidebar" aria-hidden="true">
            <span>Register</span>
            <span>Programs</span>
            <span>Contractors</span>
            <span>Deficiencies</span>
          </div>
        )}
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Sample jurisdiction register"
        >
          <table className="register-table">
            <caption>Testing register</caption>
            <thead>
              <tr>
                <th scope="col">Building</th>
                <th scope="col">Program</th>
                {!compact && <th scope="col">Last result</th>}
                <th scope="col">Next due</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {f.rows.map((row) => (
                <tr key={row.building}>
                  <td>{row.building}</td>
                  <td>{row.program}</td>
                  {!compact && <td>{row.last}</td>}
                  <td>{row.due}</td>
                  <td>
                    <StatusPill status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mockup-foot">
        <span>{f.contractor}</span>
        <span>{f.filed}</span>
      </div>
    </figure>
  );
}
