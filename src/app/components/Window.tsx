"use client";
import { useState } from "react";
import { Button } from "./basic/Button";
import CloseIcon from "./icons/Close";
import MaximizeIcon from "./icons/Maximize";
import MinimizeIcon from "./icons/Minimize";
import { useI18n } from "@locales/client";

export const Window: React.FC<{
  children: React.ReactNode;
  link?: string;
  title?: string;
  windowPath?: string;
  className?: string;
}> = ({ children, link, title, windowPath, className }) => {
  const t = useI18n();
  const [minimised, setMinimised] = useState(false);
  const [showWindow, setShowWindow] = useState(true);

  if (!showWindow) {
    return null;
  }
  return (
    <div
      className={`border-accent-dark ${className ?? ""} border-2 shadow-lg shadow-gray-500`}
    >
      <div className={`border-juvu-blue-light bg-juvu-blue-light border-6`}>
        <div className="flex justify-between">
          <span className="font-pixel line-clamp-1 pl-1 text-xl font-extrabold">
            {title}
          </span>
          <div className="bg-juvu-blue-light flex items-center justify-end gap-1 pb-2">
            <div
              className="border-juvu-blue flex h-5 w-5 items-center justify-center border-2"
              onClick={() => {
                setMinimised(true);
              }}
            >
              <MinimizeIcon size={12} />
            </div>
            <div
              className="border-juvu-blue flex h-5 w-5 items-center justify-center border-2"
              onClick={() => {
                setMinimised(false);
              }}
            >
              <MaximizeIcon size={12} />
            </div>
            <div
              className="border-juvu-blue bg-juvu-red select-pointer flex h-5 w-5 items-center justify-center border-2"
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
      </div>
      <div className={"bg-juvu-blue-light flex flex-col justify-between p-1"}>
        {!minimised && (
          <div
            className={
              "border-accent-dark bg-juvu-white mb-2 border-2 p-4 break-words hyphens-auto"
            }
          >
            {children}
          </div>
        )}
        {link && (
          <div className="bg-juvu-blue-light flex justify-center p-2">
            <Button text={t("read-more")} href={link} />
          </div>
        )}
      </div>
    </div>
  );
};
