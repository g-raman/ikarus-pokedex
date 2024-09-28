import PokemonTypeColourMap from "../utils/PokemonTypeColourMap";

export const PokemonTypeBadge = ({ id, types }) => {
  return (
    <div className="flex flex-col gap-2">
      {types.map((type) => (
        <div
          className={`rounded-sm py-1 px-3 w-20 text-center ${PokemonTypeColourMap.get(type)}`}
          key={`${id}${type}`}
        >
          {type}
        </div>
      ))}
    </div>
  );
};
