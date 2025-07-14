import { Popover } from "antd"
import { FC } from "react"
import { PiBellRingingLight } from "react-icons/pi"


interface NotyfycationPopoverI{


}


const NotyfycationPopover: FC<NotyfycationPopoverI> = () => {
    return (
        <Popover
        trigger="click"
        content={<div>notifycation</div>}
        className="relative"
      >
        <PiBellRingingLight size={25} />
        <span className="text-[10px] absolute top-[-1px] right-0 text-white bg-red-600 rounded-full  w-[14px] h-[14px] flex items-center justify-center">
          1
        </span>
      </Popover>
    )
}

export default NotyfycationPopover