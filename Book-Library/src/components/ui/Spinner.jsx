import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="flex justify-center my-8">
      <FaSpinner className="animate-spin text-2xl text-blue-500" />
    </div>
  );
}