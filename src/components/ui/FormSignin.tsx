import React, { useState, type FormEvent } from "react";
import { Label } from "./label";
import { Input } from "./input";

const FormSignin = () => {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }
  return (
    <form onSubmit={submit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">name</Label>
        <Input
          type="name"
          id="name"
          name="name"
          placeholder="name"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">message</Label>
        <Input
          type="message"
          name="message"
          id="message"
          placeholder="message"
        />
      </div>
      <button>Send</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default FormSignin;
