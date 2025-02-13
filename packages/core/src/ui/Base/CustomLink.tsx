import Link from "next/link.js";
import { Tooltip } from "../Tooltip";
import TwitterEmbed from "./TwitterEmbed";

const TWITTER_REGEX =
  /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;

interface Props {
  href: string;
  data: any;
  usehook: any;
  preview: boolean;
  [x: string]: unknown;
}

export const CustomLink: React.FC<Props> = ({
  data,
  usehook,
  preview,
  ...props
}) => {
  const { href } = props; // keep href in props to render tooltip content
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  // Use next link for pages within app and <a> for external links.
  // https://nextjs.org/learn/basics/navigate-between-pages/client-side
  if (isInternalLink) {
    return preview ? (
      <Tooltip
        {...props}
        data={data}
        usehook={usehook}
        render={(tooltipTriggerProps) => <Link {...tooltipTriggerProps} />}
      />
    ) : (
      <Link {...props} />
    );
  }

  if (isAnchorLink) {
    return <a {...props} />;
  }

  if (TWITTER_REGEX.test(href)) {
    return <TwitterEmbed url={href} {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};
