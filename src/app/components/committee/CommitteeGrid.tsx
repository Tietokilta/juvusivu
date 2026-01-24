import { getPayload } from "payload";
import configPromise from "@payload-config";
import { CommitteeMemberBox } from "@components/committee/CommitteeMemberBox";

export default async function CommitteeGrid() {
  const payload = await getPayload({ config: configPromise });
  const committeeMembers = await payload.find({
    collection: "committee-members",
    sort: "id",
  });
  return (
    <div>
      <div className="my-8 flex shrink-0 flex-wrap justify-center gap-8">
        {committeeMembers.docs.map((cm) => (
          <CommitteeMemberBox key={cm.id} member={cm} className="flex-1" />
        ))}
      </div>
    </div>
  );
}
