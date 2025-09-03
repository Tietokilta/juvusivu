import { getI18n } from "@locales/server";
import { Button } from "./basic/Button";
import CloseIcon from "./icons/Close";
import MaximizeIcon from "./icons/Maximize";
import MinimizeIcon from "./icons/Minimize";

export const Window: React.FC<{
  children: React.ReactNode;
  link?: string;
  title?: string;
  className?: string;
  simple?: boolean;
}> = async ({ children, link, title, className, simple = true }) => {
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
            <a className="border-juvu-blue bg-juvu-red flex h-5 w-5 items-center justify-center border-2 select-pointer"
            href="/">
              <CloseIcon size={12} />
            </a>
          </div>
        </div>
        <div
          className={
            simple ? "bg-juvu-white border-accent-dark border-2 p-4" : ""
          }
        >
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
