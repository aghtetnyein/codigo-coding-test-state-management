import { useDispatch, useSelector } from "react-redux";

// reducers
import {
  addTeam,
  updateTeam,
  deleteTeam,
} from "../../redux/features/teamSlice";
import { closeTeamModal } from "../../redux/features/teamModalSlice";
import { removePlayersFromTeam } from "../../redux/features/playerSlice";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// components
import { InputText, Button } from "../forms";

// icons
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

// interfaces
import { ISingleTeamProps } from "../../interfaces/team";
interface IPlayerTeamIdsInterface {
  playerId: number;
  teamId: number | undefined;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  playerCount: yup.number().required("Player count is required"),
  region: yup.string().required("Region is required"),
  country: yup.string().required("Country is required"),
});

const TeamModal = () => {
  // redux
  const dispatch = useDispatch();
  const { formType, team } = useSelector((state: any) => state.teamModal);
  const teams = useSelector((state: any) => state.team.teams);
  const players = useSelector((state: any) => state.player.players);

  // hook-forms
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:
      team !== null
        ? {
            name: team.name,
            playerCount: team.playerCount,
            region: team.region,
            country: team.country,
          }
        : {
            name: "",
            playerCount: 0,
            region: "",
            country: "",
          },
  });

  const closeModal = () => {
    dispatch(closeTeamModal());
  };

  const onSubmit = (data: {
    name: string;
    playerCount: number;
    region: string;
    country: string;
  }) => {
    const tempTeam = teams.find(
      (team: ISingleTeamProps) => team.name === data.name
    );

    if (tempTeam) {
      setError("name", {
        type: "manual",
        message: "Team name already exists",
      });
    } else {
      if (formType === "create") {
        // create
        dispatch(
          addTeam({
            team: {
              id: 0,
              name: data.name,
              playerCount: data.playerCount,
              region: data.region,
              country: data.country,
            },
          })
        );
      } else if (formType === "update") {
        // update
        formType === "update" &&
          dispatch(
            updateTeam({
              team: {
                id: team.id,
                name: data.name,
                playerCount: data.playerCount,
                region: data.region,
                country: data.country,
              },
            })
          );
      }

      closeModal();
    }
  };

  const handleDeleteTeam = () => {
    const filteredPlayers = players.filter(
      (player: IPlayerTeamIdsInterface) => {
        return player.teamId === team.id;
      }
    );

    let allPlayersId = players.map(
      (item: IPlayerTeamIdsInterface) => item.playerId
    );

    let filteredPlayersId = filteredPlayers.map(
      (playerItem: IPlayerTeamIdsInterface) => playerItem.playerId
    );

    const playerIds = allPlayersId.filter(
      (playerId: number) => !filteredPlayersId.includes(playerId)
    );

    const remainedPlayers = players
      .map((item: IPlayerTeamIdsInterface) => {
        if (playerIds.includes(item.playerId)) {
          return {
            playerId: item.playerId,
            teamId: item.teamId,
          };
        }
        return null;
      })
      .filter((item: any) => item !== null);

    dispatch(
      removePlayersFromTeam({
        players: remainedPlayers,
      })
    );

    dispatch(
      deleteTeam({
        teamId: team.id,
      })
    );

    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-dark/70 flex items-center justify-center p-2">
      <div className="bg-white p-8">
        <div className="flex items-center justify-between">
          {formType === "create" && (
            <h3 className="text-xl font-bold">Create Team</h3>
          )}
          {formType === "update" && (
            <h3 className="text-xl font-bold">Update Team</h3>
          )}
          <Button
            type="button"
            variant="icon"
            disabled={false}
            icon={<CloseIcon className="w-4 h-4" />}
            handleClick={closeModal}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="mt-8 grid grid-cols-2 gap-4">
            <InputText
              register={register("name")}
              required={true}
              type={"text"}
              disabled={false}
              name={"name"}
              label={"Team Name"}
              placeholder={"Team Name"}
              error={errors.name?.message?.toString()}
            />
            <InputText
              register={register("region")}
              required={true}
              type={"text"}
              disabled={false}
              name={"region"}
              label={"Region"}
              placeholder={"Region"}
              error={errors.region?.message?.toString()}
            />
            <InputText
              register={register("country")}
              required={true}
              type={"text"}
              disabled={false}
              name={"country"}
              label={"Country"}
              placeholder={"Country"}
              error={errors.country?.message?.toString()}
            />
            <InputText
              register={register("playerCount")}
              required={true}
              type={"text"}
              disabled={true}
              name={"playerCount"}
              label={"Player Count"}
              placeholder={"Player Count"}
              error={errors.playerCount?.message?.toString()}
            />
          </div>

          {formType === "create" && (
            <Button
              variant={"primary"}
              type={"submit"}
              disabled={false}
              label={"Create team"}
            />
          )}

          {formType === "update" && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={"danger"}
                type={"button"}
                disabled={false}
                label={"Delete team"}
                handleClick={handleDeleteTeam}
              />
              <Button
                variant={"primary"}
                type={"submit"}
                disabled={false}
                label={"Save changes"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeamModal;
