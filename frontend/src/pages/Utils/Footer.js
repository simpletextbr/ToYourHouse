import React from "react";

import Appicon from "../../assets/icon.png";

export default function Footer() {
  return (
    <footer>
      <p>
        2020@ Todos Os Direitos Reservatos. Developed by{" "}
        <a
          href="https://www.instagram.com/wesley.praca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WESLEY PRAÇA.
        </a>
      </p>
      <div>
        <a href="https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40wesleypraca/mobile-0029f5edf6e545e1885a1a209cb0d18c-signed.apk">
          <img src={Appicon} alt="Icone de donwload do app" />
          <i>Download app</i>
        </a>
      </div>
    </footer>
  );
}
