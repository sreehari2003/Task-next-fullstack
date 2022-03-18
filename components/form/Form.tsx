import React, { useRef, useState } from "react";
import Styles from "./form.module.scss";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Button from "@mui/material/Button";
interface fun {
  onChange: () => void;
}
const Form: React.FC<fun> = ({ onChange }) => {
  const [value, setValue] = useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  const [err, setErr] = useState<boolean>(false);
  const task = useRef<HTMLInputElement>();
  const desc = useRef<HTMLInputElement>();
  const Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (desc.current && task.current) {
      const text = task.current.value;
      const des = desc.current.value;
      if (text.length < 1 || des.length < 1) {
        setErr(true);
      } else {
        setErr(false);
        const obj = {
          title: text,
          description: des,
          date: value,
        };
        const sendData = async () => {
          try {
            const res = await fetch("/api/handler", {
              method: "POST",
              body: JSON.stringify(obj),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            onChange();
            if (!data.ok) throw new Error(data.message);
          } catch (e) {
            alert(e);
          }
        };

        sendData();
        task.current.value = "";
        desc.current.value = "";
        setValue(new Date());
      }
    }
  };
  return (
    <div className={Styles.form}>
      <h1>Task Manager</h1>
      <form onSubmit={Submit}>
        <TextField
          id="outlined-password-input"
          label="Task Title"
          type="text"
          autoComplete="current-password"
          inputRef={task}
        />
        <TextField
          id="outlined-multiline-static"
          label="Task Description"
          multiline
          rows={3}
          className={Styles.txt}
          inputRef={desc}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" type="submit" className={Styles.btn}>
          Add Task
        </Button>
        {err && <span>Please fill all fields*</span>}
      </form>
    </div>
  );
};
export default Form;
