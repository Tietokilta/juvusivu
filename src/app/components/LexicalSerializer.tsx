import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import { Block } from "payload";
import Events from "./events/Events";
import React, { JSX } from "react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {} from "@payloadcms/richtext-lexical/lexical/rich-text";

export const EventGridBlock: Block = {
  slug: "eventGrid",
  fields: [],
};

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<typeof EventGridBlock>;

const headingClasses: Record<string, string> = {
  h1: "text-4xl font-bold mt-6",
  h2: "text-3xl font-semibold font-mono mt-5 mb-2",
  h3: "text-2xl font-medium font-mono mt-4",
  h4: "text-xl font-medium mt-3",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
};

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

  blocks: {
    eventGrid: () => <Events />,
  },
});

export const LexicalSerializer: React.FC<{
  data: SerializedEditorState;
}> = ({ data }) => {
  return <RichText converters={jsxConverters} data={data} />;
};
