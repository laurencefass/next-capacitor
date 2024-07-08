"use client";

// pages/page.tsx
import React from "react";
import MDXComponent from "./component.mdx";
import Link from "next/link";

function Message() {
  return <h1>Hello world!</h1>;
}

const components = {
  Message: Message,
  Link: Link,
  Hello(props: {name: string}) { return "Hello "  + props.name},
};

const Page = () => {
  return (
    <div>
      <h1>Demo of MDX in TSX</h1>
      <MDXComponent components={components} />
    </div>
  );
};

export default Page;
