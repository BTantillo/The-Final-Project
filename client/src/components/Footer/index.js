import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto p-4">
      <div className="container flex-row justify-center justify-space-between-sm">
        &copy;{new Date().getFullYear()}
        <a href="https://github.com/DuckArroyo">  Duck Arroyo  </a>
        <a href="https://github.com/Chesebro11">Jared Chesebro  </a>
        <a href="https://github.com/SLemons6">Shayne Lemons  </a>
        <a href="https://github.com/BTantillo">Ben Tantillo  </a>
      </div>
    </footer>
  );
};

export default Footer;
