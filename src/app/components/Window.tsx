import { getI18n } from "@locales/server";
import { Button } from "./basic/Button";

export const Window: React.FC<{
  children: React.ReactNode;
  link?: string;
}> = async ({ children, link }) => {
  const t = await getI18n();
  return (
    <div className="border-juvu-blue-light bg-juvu-blue-light border-6">
      <div className="bg-juvu-blue-light flex items-center justify-end gap-1 pb-2">
        <div className="border-juvu-blue h-5 w-5 border-2"></div>
        <div className="border-juvu-blue h-5 w-5 border-2"></div>
        <div className="border-juvu- bg-juvu-red h-5 w-5 border-2"></div>
      </div>
      {children}
      {link && (
        <div className="bg-juvu-blue-light flex justify-center p-2">
          <Button text={t("read-more")} href={link} />
        </div>
      )}
    </div>
  );
};
