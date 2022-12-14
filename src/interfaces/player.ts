import { ISingleTeamProps } from "./team";

export interface IPlayerProps {
  id: number;
  first_name: string;
  height_feet?: number | undefined | null;
  height_inches?: number | undefined | null;
  last_name: string;
  position?: string | undefined | null;
  team: ISingleTeamProps | undefined | null;
  weight_pounds?: number | undefined | null;
}
