import { useDispatch } from "react-redux";

// interfaces
import { ISingleTeamProps } from "../../interfaces/team";

// components
import { Button } from "../forms";

// reducers
import { openTeamModal } from "../../redux/features/teamModalSlice";

// icons
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";

const SingleTeam = ({
  id,
  name,
  playerCount,
  region,
  country,
}: ISingleTeamProps) => {
  // redux
  const dispatch = useDispatch();

  const handleEditTeam = () => {
    // dispatch
    dispatch(
      openTeamModal({
        isOpen: true,
        formType: "update",
        team: { id, name, playerCount, region, country },
      })
    );
  };

  return (
    <div className="w-full bg-white border border-gray-300 p-4 flex items-start justify-between">
      <div>
        <p className="text-md font-bold">{name}</p>
        <div className="mt-1">
          <p className="text-sm text-gray-500">Region: {region}</p>
          <p className="text-sm text-gray-500">Country: {country}</p>
          <p className="text-sm text-gray-500">
            Number of Players:{" "}
            <span className="font-bold text-primary">{playerCount}</span>
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="icon"
        disabled={false}
        icon={<EditIcon className="w-4 h-4" />}
        handleClick={handleEditTeam}
      />
    </div>
  );
};

export default SingleTeam;
