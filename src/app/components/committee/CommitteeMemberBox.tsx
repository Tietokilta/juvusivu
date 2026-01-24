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
    <div className={`order flex ${className ?? ""}`}>
      <div className="min-w-[260px] flex-1">
        <Window
          title={name}
          windowPath={`C:\\..\\Teams\\${role}\\`}
          hidePadding
        >
          <h2 className="font-pixel line-clamp-1 w-full p-2 text-center text-xl hyphens-none">
            {title}
          </h2>
          <Image
            src={photo?.url || "/placeholder_2025.jpg"}
            alt={name}
            className={`h-60 max-h-[240px] max-w-[240px] min-w-[240px] object-center ${
              photo?.url ? "object-cover" : "bg-gray-100 object-contain"
            }`}
            width={1000}
            height={1000}
          />
        </Window>
      </div>
    </div>
  );
};
