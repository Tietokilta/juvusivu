import Link from "next/link";
import { Media, Sponsor as SponsorType } from "../../../payload-types";
import Image from "next/image";

export default function Sponsor({ sponsor }: { sponsor: SponsorType }) {
  const logo = sponsor.logo as Media | undefined;
  return (
    <Link
      key={sponsor.id}
      href={sponsor.url}
      className="flex items-center justify-center"
    >
      {logo?.url ? (
        <Image
          src={logo.url}
          alt={sponsor.name}
          width={128}
          height={128}
          className="m-2 max-h-32 max-w-36 object-contain"
        />
      ) : (
        <div className="text-accent-dark bg-juvu-white flex h-16 w-32 items-center justify-center rounded shadow">
          {sponsor.name}
        </div>
      )}
    </Link>
  );
}
