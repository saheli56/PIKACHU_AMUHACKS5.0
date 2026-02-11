interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
}

export default function ChoiceButton({ text, onClick }: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-left text-gray-800 hover:bg-gray-100"
    >
      {text}
    </button>
  );
}
