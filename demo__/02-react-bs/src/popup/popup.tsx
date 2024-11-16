import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/tailwind.css';

const Popup = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Hello, React Chrome Extension!</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me
      </button>
    </div>
  );
};


const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)
root.render(<Popup />);
