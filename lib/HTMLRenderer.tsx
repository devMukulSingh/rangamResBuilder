import parseHtmlStringToHtml, { domToReact } from "html-react-parser";
import { useMemo } from "react";
import { cn } from "./utils";

export const HTMLRenderer = ({
  htmlString = "",
  className,
}: {
  htmlString: string;
  className?: string;
}) => {
  const parsedElement = useMemo(() => {
    return parseHtmlStringToHtml(htmlString, {
      transform: (reactNode: any, domNode: any) => {
        if (reactNode && reactNode.type === "ol") {
          const dToReact: any = domToReact(domNode.children);

          if (Array.isArray(dToReact)) {
            return (
              <ol className="list-decimal pl-5 break-all whitespace-normal">
                {dToReact.map((item, index) => {
                  if (!item.props.children) return null;
                  return (
                    <li key={index} className={`break-words whitespace-wrap`}>
                      {item.props.children}
                    </li>
                  );
                })}
              </ol>
            );
          } else {
            return (
              <ol className="list-decimal pl-5">
                <li>{dToReact.props.children}</li>
              </ol>
            );
          }
        } else if (reactNode && reactNode.type) {
          return <>{reactNode && domToReact(domNode.children)}</>;
        }
      },
    });
  }, [htmlString]);
  return <div className="whitespace-normal">{parsedElement}</div>;
};
