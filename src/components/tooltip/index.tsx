import React, { memo, FC } from "react";
import "./index.module.scss";
export type tooltip = {
  title: string;
  icon: React.ReactNode;
  styleCss?: React.CSSProperties;
};

const Index: FC<tooltip> = memo(function Index({ title, icon, styleCss }) {
  return (
    <div className="tooltip" style={styleCss}>
      <>{icon}</>
      <div className="title">{title}</div>
    </div>
  );
});

export default Index;
