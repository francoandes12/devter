import { colors } from "../../styles/theme";

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            background: ${colors.black};
            border: 0;
            color: ${colors.white};
            font-weight: 820;
            border-radius: 9999px;
            padding: 9px 25px;
            display: flex;
            align-items: center;
            font-size: 16px;
            cursor: pointer;
            transition: opactity 0.3 ease;
            user-select: none;
          }
          button[disabled] {
            pointer-events: none;
            opacity: 0.2;
          }
          button:hover {
            opacity: 0.7;
          }
          button > :global(svg) {
            margin-right: 8px;
          }
        `}
      </style>
    </>
  );
}
