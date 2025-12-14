import { useRef } from "react";
import Button from "./Button.jsx";
import TextInput from "./TextInput.jsx";
import Select from "./Select.jsx";
import Checkbox from "./Checkbox.jsx";

export default function Form({ value, onChange, onSubmit }) {
  const nameRef = useRef(null); // useRef demo

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <TextInput
        label="Name"
        value={value.name}
        inputRef={nameRef}
        onChange={(v) => onChange({ ...value, name: v })}
      />

      <Select
        label="Type"
        value={value.type}
        options={[
          { value: "Feature", label: "Feature" },
          { value: "Bug", label: "Bug" },
          { value: "Chore", label: "Chore" },
        ]}
        onChange={(v) => onChange({ ...value, type: v })}
      />

      <Checkbox
        label="High priority"
        checked={value.priority}
        onChange={(v) => onChange({ ...value, priority: v })}
      />

      <div className="row" style={{ marginTop: 10 }}>
        <Button type="submit" variant="primary">
          Add item
        </Button>
        <Button
          type="button"
          onClick={() => {
            nameRef.current?.focus();
          }}
        >
          Focus name (useRef)
        </Button>
      </div>
    </form>
  );
}
