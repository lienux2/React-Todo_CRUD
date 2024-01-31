import "./Button.css";

type ButtonProps = {
  buttonName: string;
  buttonStyle: "add" | "delete" | "edit" | "save";
  click?: () => void;
};

export function Button({ buttonStyle, buttonName, click }: ButtonProps) {
  return (
    <>
      <button className={buttonStyle} onClick={click}>
        {buttonName}
      </button>
    </>
  );
}
