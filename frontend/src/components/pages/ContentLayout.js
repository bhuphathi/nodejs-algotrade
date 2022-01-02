import { memo } from "react";
import tw from "tailwind-styled-components";
import { NotificationMenu } from "..";

import TileApp from "../TransitionExample/TileApp";

import "./content.css";

const Button = tw.div`
    ${(p) => (p.$primary ? "bg-indigo-600" : "bg-indigo-300")}

    //flex
    inline-flex
    items-center
    border
    border-transparent
    text-xs
    font-medium
    rounded
    shadow-sm
    text-white
    px-3
    py-1

    hover:bg-indigo-700
    focus:outline-none
`;

const ContentLayout = () => {
  console.log("Contents rendered...");
  return (
    <div className="content-layout" id="content">
      
      <NotificationMenu />
      <section className="p-2">
        <div>
          <h1>Content Section </h1>
          <button className={"btn btn-outline"}>Content Section </button>
          <button className="ml-2 btn btn-indigo">Primary </button>
          <Button $primary={true}>Button primary </Button>
          <div>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora porro itaque, facilis accusantium molestias error repellendus necessitatibus, magni, ipsa sequi dignissimos iste debitis sed saepe nam perspiciatis eveniet voluptate sit.
          </div>
          <TileApp />
        </div>
      </section>
    </div>
  );
};

export default memo(ContentLayout);
