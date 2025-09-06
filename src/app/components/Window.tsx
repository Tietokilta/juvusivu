import { getI18n } from "@locales/server";
import { Button } from "./basic/Button";
import CloseIcon from "./icons/Close";
import MaximizeIcon from "./icons/Maximize";
import MinimizeIcon from "./icons/Minimize";
import Link from "next/link";

export const Window: React.FC<{
  children: React.ReactNode;
  link?: string;
  title?: string;
  windowPath?: string;
  className?: string;
}> = async ({ children, link, title, windowPath, className }) => {
  const t = await getI18n();
  return (
    <div
      className={`border-accent-dark ${className ?? ""} border-2 shadow-lg shadow-gray-500`}
    >
      <div className={`border-juvu-blue-light bg-juvu-blue-light border-6`}>
        <div className="flex justify-between">
          <span className="font-pixel block pl-1 text-lg">{title}</span>
          <div className="bg-juvu-blue-light flex items-center justify-end gap-1 pb-2">
            <div className="border-juvu-blue flex h-5 w-5 items-center justify-center border-2">
              <MinimizeIcon size={12} />
            </div>
            <div className="border-juvu-blue flex h-5 w-5 items-center justify-center border-2">
              <MaximizeIcon size={12} />
            </div>
            <Link
              className="border-juvu-blue bg-juvu-red select-pointer flex h-5 w-5 items-center justify-center border-2"
              href="/"
            >
              <CloseIcon size={12} />
            </Link>
          </div>
        </div>
        {windowPath && (
          <div className="border-accent-dark bg-juvu-white mb-2 border-2 p-1">
            <h2 className="text-accent-dark font-pixel mx-2 text-lg">
              {windowPath}
            </h2>
          </div>
        )}
      </div>
      <div className={"bg-juvu-blue-light flex flex-col justify-between p-1"}>
        <div className={"border-accent-dark bg-juvu-white mb-2 border-2 p-4"}>
          {children}
        </div>
        {link && (
          <div className="bg-juvu-blue-light flex justify-center p-2">
            <Button text={t("read-more")} href={link} />
          </div>
        )}
      </div>
    </div>
  );
};
