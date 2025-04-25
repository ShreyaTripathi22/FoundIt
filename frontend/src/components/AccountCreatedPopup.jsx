import { useEffect } from "react";

export default function AccountCreatedPopup({ name, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // call parent to redirect
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-[#a124e9] shadow-2xl border border-gray-700 px-6 py-4 rounded-2xl text-center z-50">
      <p className="text-lg font-semibold">
        Welcome, {name}. Your account is created.
      </p>
    </div>
  );
}
