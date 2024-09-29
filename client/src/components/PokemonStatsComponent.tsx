import { Progress } from "antd";
import { Pokemon } from "../utils/types";

interface PokemonStatsComponentProps {
  pokemon: Pokemon;
}

export const PokemonStatsComponent: React.FC<PokemonStatsComponentProps> = ({
  pokemon,
}) => {
  const stats = pokemon.base;
  const maxStat =
    Math.max(
      stats.HP,
      stats.Attack,
      stats.Defense,
      stats.SpAttack,
      stats.SpDefense,
      stats.Speed,
    ) + 20;

  return (
    <div>
      <p>HP</p>
      <Progress
        format={() => `${stats.HP}`}
        percent={Number(((stats.HP / maxStat) * 100).toFixed(1))}
      />

      <p>Attack</p>
      <Progress
        format={() => `${stats.Attack}`}
        percent={Number(((stats.Attack / maxStat) * 100).toFixed(1))}
      />

      <p>Defense</p>
      <Progress
        format={() => `${stats.Defense}`}
        percent={Number(((stats.Defense / maxStat) * 100).toFixed(1))}
      />

      <p>Sp. Attack</p>
      <Progress
        format={() => `${stats.SpAttack}`}
        percent={Number(((stats.SpAttack / maxStat) * 100).toFixed(1))}
      />

      <p>Sp. Defense</p>
      <Progress
        format={() => `${stats.SpDefense}`}
        percent={Number(((stats.SpDefense / maxStat) * 100).toFixed(1))}
      />

      <p>Speed</p>
      <Progress
        format={() => `${stats.Speed}`}
        percent={Number(((stats.Speed / maxStat) * 100).toFixed(1))}
      />
    </div>
  );
};
