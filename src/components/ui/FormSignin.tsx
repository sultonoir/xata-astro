import React, { useState, type FormEvent } from "react";
import { Label } from "./label";
import { Input } from "./input";

const FormSignin = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((t) => t.json());
    const data = await response;
    if (data.message) {
      setResponseMessage(data.message);
    }
  }
  return (
    <form>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">name</Label>
        <Input
          type="name"
          id="name"
          name="name"
          placeholder="name"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="inline-flex px-2 py-1 rounded-lg bg-primary text-white"
        onClick={submit}
      >
        Submit
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default FormSignin;
