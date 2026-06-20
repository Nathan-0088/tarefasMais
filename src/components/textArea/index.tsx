import { HTMLProps } from "react";

export default function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full border-2 h-45 rounded-3xl p-4 my-4 border-gray-700"
      {...rest}
    ></textarea>
  );
}
