import { ButtonHTMLAttributes } from "react";

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    />
  );
}