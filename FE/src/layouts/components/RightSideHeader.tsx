import NotyfycationPopover from "@/components/Popover/NotyfycationPopover";
import ProfilePopover from "@/components/Popover/ProfilePopover";
import { FC } from "react";
interface RightSideHeaderProps { }

const RightSideHeader: FC<RightSideHeaderProps> = () => {
  return (
    <div className="actions flex items-center justify-center gap-4">
      <NotyfycationPopover />
      <ProfilePopover />
    </div>
  );
};

export default RightSideHeader;
