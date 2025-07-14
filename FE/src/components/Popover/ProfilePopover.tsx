import { useAppDispatch, useAppSelector } from "@/app/hook"
import ModalEditProfile from "@/components/Modal/ModalEditProfile"
import { ROLES } from "@/contants/Role"
import { logout } from "@/slices/userSlice"
import { Button, Popover } from "antd"
import { FC } from "react"
import { CiLogout, CiUser } from "react-icons/ci"

interface ProfilePopoverI {



}


const ProfilePopover: FC<ProfilePopoverI> = () => {




    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    console.log("user >>>", user);


    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Popover
            content={<div className="">

                <ModalEditProfile
                    data={user}
                    button={<Button type="text" className="w-full flex justify-start">
                        <CiUser size={20} />
                        <span>

                            Edit Profile
                        </span>
                    </Button>}
                />


                <Button
                    onClick={handleLogout}
                    type="text" className="w-full flex justify-start">
                    <CiLogout size={20} color="red" />
                    <span>Logout</span>
                </Button>




            </div>}
            title={<p><span className="text-gray-400 inline-block mr-3">Hello</span>       <span>{user?.name || user?.username || ROLES.Admin}</span> !</p>}
            trigger="click"
        >
            <div className="avt w-[50px] h-[50px]">
                <img
                    className="rounded-full"
                    width={40}
                    height={40}
                    src="https://cdn.vectorstock.com/i/500p/44/01/default-avatar-photo-placeholder-icon-grey-vector-38594401.jpg"
                    alt=""
                />
            </div>
        </Popover>
    )
}

export default ProfilePopover