import PokemonTypeColourMap from "../utils/PokemonTypeColourMap";

interface PokemonTypeBadgeProps {
  id: number;
  type: string;
}

export const PokemonTypeBadge: React.FC<PokemonTypeBadgeProps> = ({
  id,
  type,
}) => {
  return (
    <div
      className={`rounded-3xl py-1 px-3 min-w-20 text-center ${PokemonTypeColourMap.get(type)}`}
      key={`${id}${type}`}
    >
      {type}
    </div>
  );
};
