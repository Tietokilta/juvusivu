import { CommitteeMember, Media } from "../../../../payload-types";
import { Window } from "@components/Window";
import Image from "next/image";

export const CommitteeMemberBox = ({
  member,
  className,
}: {
  member: CommitteeMember;
  className?: string;
}) => {
  const name = member.name || "";
  const role = member.role || "";
  const title = member.title || "";
  const photo = member.photo as Media | undefined;
  return (
    <div className={`event-box max-w-[240px] min-w-[240px] ${className ?? ""}`}>
      <Window title={name} windowPath={`C:\\..\\Teams\\${role}\\`} hidePadding>
        <h2 className="font-pixel line-clamp-1 w-full pt-2 pl-1 text-center text-2xl hyphens-none">
          {title}
        </h2>
        <Image
          src={photo?.url || "/placeholder_2025.jpg"}
          alt={name}
          className="h-48 w-full border-b-2 border-gray-900 object-contain object-cover object-center"
          width={1000}
          height={1000}
        />
      </Window>
    </div>
  );
};
