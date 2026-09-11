import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { signupApi } from "../auth/apis/auth-api";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않음");
      return;
    }

    await signupApi({ email, password, nickname });
  };

  return (
    <form className="w-[320px]" onSubmit={handleSubmit}>
      <Input
        label="email"
        value={email}
        placeholder="이메일을 입력해"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="password"
        value={password}
        placeholder="비밀번호를 입력해"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="password check"
        value={passwordCheck}
        placeholder="비밀번호 확인해"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <Input
        label="nickname"
        value={nickname}
        placeholder="닉네임을 입력해"
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button type="submit">회원가입</Button>
    </form>
  );
};

export default Form;
