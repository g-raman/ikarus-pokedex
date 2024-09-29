import { Image } from "antd";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex text-8xl px-32 py-16 justify-center">
      <Link to="/">
        <Image
          width={256}
          preview={false}
          src="https://assets-global.website-files.com/65dcf75e267504cf108a58e8/65dcfd16a5d9a6d8020107eb_ikarus%20dark.png"
        />
      </Link>
      <p>Ikarus Pokedex</p>
    </div>
  );
};
