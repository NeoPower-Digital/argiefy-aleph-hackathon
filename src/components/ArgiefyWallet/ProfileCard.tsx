import { User } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="flex gap-4 items-center">
      <div className="p-2 border rounded-full">
        <User size={48} />
      </div>

      <div>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-sm text-gray-400">5,460 points</p>
      </div>
    </div>
  );
};

export default ProfileCard;
