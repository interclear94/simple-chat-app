interface ButtonProps {
  type: "submit" | "button";
  onClick?: () => void;
  children: React.ReactNode;
  // className: string;
}

const Button = ({
  type = "button",
  onClick,
  children,
  // className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-20 mt-4 cursor-pointer rounded-md border bg-sky-300 text-black`}
    >
      {children}
    </button>
  );
};

export default Button;
