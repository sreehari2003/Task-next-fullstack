import React, { useEffect, useState, useCallback } from "react";
import classes from "./task.module.scss";
import { TiTick } from "react-icons/ti";
import { ImBin2 } from "react-icons/im";

interface res {
  _id: number;
  title: string;
  description: string;
}
interface fun {
  change: boolean;
  onChange: () => void;
}
const Task: React.FC<fun> = ({ change, onChange }) => {
  const [data, setData] = useState<res[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getTask = async () => {
    try {
      const res = await fetch("api/handler");
      const data = await res.json();
      setData(data.tasks);

      setLoading(false);
    } catch (e) {
      alert("Error fetching task");
    }
  };
  const deletes = async (el: number) => {
    try {
      console.log(el);
      const obj = {
        id: el,
      };
      const res = await fetch("api/handler", {
        method: "DELETE",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      onChange();
    } catch {}
  };

  useEffect(() => {
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  if (loading) {
    return (
      <div className={classes.box}>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <>
      <h2>Your tasks</h2>
      <div className={classes.box}>
        {data?.map((el, index) => (
          <>
            <div className={classes.txt}>
              <h1>
                {index + 1}.{el.title}
              </h1>
              <div className={classes.icon}>
                <>
                  <ImBin2 onClick={() => deletes(data[index]._id)} />
                  <TiTick onClick={() => deletes(data[index]._id)} />
                </>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Task;
