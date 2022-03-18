import React, { useState } from "react";
import Form from "../components/form/Form";
import Task from "../components/Task";
const Index: React.FC = () => {
  const [change, setChange] = useState<boolean>(false);
  const onChange = () => {
    setChange(!change);
  };
  return (
    <div className="box">
      <Form onChange={onChange} />

      <Task change={change} onChange={onChange} />
    </div>
  );
};

export default Index;
