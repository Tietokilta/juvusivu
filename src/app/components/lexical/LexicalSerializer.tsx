import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import Events from "../events/Events";
import React, { JSX } from "react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getLocale } from "next-intl/server";
import { EventGridBlock, EventGridBlockType } from "./Blocks";
import CommitteeGrid from "@components/committee/CommitteeGrid";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<EventGridBlockType>;

const headingClasses: Record<string, string> = {
  h1: "text-4xl font-bold mt-6 font-mono",
  h2: "text-3xl font-semibold font-mono mt-5 mb-2",
  h3: "text-2xl font-medium font-mono mt-4",
  h4: "text-xl font-medium mt-3",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
};

export const LexicalSerializer: React.FC<{
  data: SerializedEditorState;
}> = async ({ data }) => {
  const locale = await getLocale();
  const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
    defaultConverters,
  }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const level = node.tag || "h2";
      const HeadingTag = level as keyof JSX.IntrinsicElements;
      const children = nodesToJSX({ nodes: node.children });
      const className = headingClasses[level] || "";

      return <HeadingTag className={className}>{children}</HeadingTag>;
    },

    list: ({ node, nodesToJSX }) => {
      const Tag = node.tag === "ol" ? "ol" : "ul";
      const className =
        node.listType === "number"
          ? "list-decimal ml-6"
          : node.listType === "check"
            ? undefined
            : "list-disc ml-6";
      const children = nodesToJSX({ nodes: node.children });
      return <Tag className={className}>{children}</Tag>;
    },

    blocks: {
      eventGrid: ({
        node,
      }: {
        node: SerializedBlockNode<EventGridBlockType>;
      }) => <Events locale={locale} category={node.fields.category} />,
      committeeGrid: () => <CommitteeGrid />,
    },
  });

  return <RichText converters={jsxConverters} data={data} />;
};
export { EventGridBlock };
