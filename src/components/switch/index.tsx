import React, { useEffect, FC, useMemo, useState, useRef } from "react";
import "./index.module.scss";
import { defaultTheme } from "@/core/config";
export interface switchType {
  sole: string;
  label: string;
  onChange?: Function;
  theme?: string;
}

const Index: FC<switchType> = function Index({ sole, label, onChange, theme }) {
  const [on, setOn] = useState("no");

  const refs = useRef<HTMLInputElement>(null!);

  const switchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    const status = e.target.value === "yes" ? "no" : "yes";
    setOn(status);
    onChange && onChange(status);
  };
  useEffect(() => {
    refs.current.style.setProperty("--JoL-theme", theme ? theme : defaultTheme);
  }, [theme]);

  const render = useMemo(
    () => (
      <div className="container">
        <label htmlFor={sole} className="label">
          {label}
        </label>
        <input
          ref={refs}
          className="switch"
          type="checkbox"
          id={sole}
          onChange={switchChange}
          value={on}
        />
      </div>
    ),
    [sole, label, on]
  );
  return render;
};

export default Index;
