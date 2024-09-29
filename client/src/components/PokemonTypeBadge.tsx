import PokemonTypeColourMap from "../utils/PokemonTypeColourMap";

export const PokemonTypeBadge = ({ id, types }) => {
  return (
    <div className="flex flex-col gap-2 text-base">
      {types.map((type) => (
        <div
          className={`rounded-3xl py-1 px-3 min-w-20 text-center ${PokemonTypeColourMap.get(type)}`}
          key={`${id}${type}`}
        >
          {type}
        </div>
      ))}
    </div>
  );
};
