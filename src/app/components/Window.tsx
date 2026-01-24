"use client";
import { useState } from "react";
import { Button } from "./basic/Button";
import CloseIcon from "./icons/Close";
import MaximizeIcon from "./icons/Maximize";
import MinimizeIcon from "./icons/Minimize";
import { useTranslations } from "next-intl";

export const Window: React.FC<{
  children: React.ReactNode;
  link?: string;
  title?: string;
  windowPath?: string;
  className?: string;
  hidePadding?: boolean;
  highlight?: boolean;
}> = ({
  children,
  link,
  title,
  windowPath,
  className,
  hidePadding,
  highlight,
}) => {
  const t = useTranslations();
  const [minimised, setMinimised] = useState(false);
  const [showWindow, setShowWindow] = useState(true);
  const bg = highlight ? "bg-juvu-gold" : "bg-juvu-lightblue";
  const bgBorder = highlight ? "border-juvu-gold" : "border-juvu-lightblue";
  const bgHover = highlight
    ? "hover:bg-juvu-gold-dark"
    : "hover:bg-juvu-lightblue-dark";

  if (!showWindow) {
    return null;
  }
  return (
    <div
      className={`border-accent-dark ${className ?? ""} border-2 shadow-lg shadow-gray-500`}
    >
      <div className={`${bgBorder} ${bg} border-6`}>
        <div className="flex justify-between">
          <span className="font-pixel line-clamp-1 pl-1 text-xl">{title}</span>
          <div className={`${bg} flex items-center justify-end gap-1 pb-2`}>
            <div
              className={`border-juvu-blue ${bgHover} flex h-5 w-5 items-center justify-center border-2`}
              onClick={() => {
                setMinimised(true);
              }}
            >
              <MinimizeIcon size={12} />
            </div>
            <div
              className={`border-juvu-blue ${bgHover} flex h-5 w-5 items-center justify-center border-2`}
              onClick={() => {
                setMinimised(false);
              }}
            >
              <MaximizeIcon size={12} />
            </div>
            <div
              className="border-juvu-blue bg-juvu-red hover:bg-juvu-red-dark select-pointer flex h-5 w-5 items-center justify-center border-2"
              onClick={() => {
                setShowWindow(false);
              }}
            >
              <CloseIcon size={12} />
            </div>
          </div>
        </div>
        {windowPath && (
          <div className="border-accent-dark bg-juvu-white mb-2 truncate border-2 p-1">
            <h2 className="text-accent-dark font-pixel mx-2 text-lg">
              {windowPath}
            </h2>
          </div>
        )}

        <div className={`${bg} flex flex-col justify-between`}>
          {!minimised && (
            <div
              className={`border-accent-dark bg-juvu-white border-2 ${hidePadding ? "" : "p-4"} break-words hyphens-auto`}
            >
              {children}
            </div>
          )}
          {link && (
            <div className={`${bg} flex justify-center p-2`}>
              <Button type="link" text={t("read-more")} href={link} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
