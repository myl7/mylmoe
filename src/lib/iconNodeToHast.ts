import type { IconNode } from "lucide";
import { h } from "hastscript";
import type { Element } from "hast";

export default function iconNodeToHast(node: IconNode): Element {
  const [tag, attrs, children] = node;
  return h(tag, attrs, children && children.map(iconNodeToHast));
}
