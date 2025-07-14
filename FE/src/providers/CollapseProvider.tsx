import { createContext, FC, ReactNode, useState } from "react";
import OverLay from "@/components/Overlay/Over.ay";
interface CollapseProviderProps {

    children: ReactNode
}


export const CollapseContext = createContext<{
    isCollapse: boolean;
    setIsCollapse: (isCollapse: boolean) => void;
}>({
    isCollapse: false,
    setIsCollapse: () => { }
});
const CollapseProvider: FC<CollapseProviderProps> = ({ children }) => {


    const [isCollapse, setIsCollapse] = useState<boolean>(false)
    return <CollapseContext.Provider value={{ isCollapse, setIsCollapse }}>
        {children}

        {
            isCollapse && <OverLay />
        }
    </CollapseContext.Provider>






}

export default CollapseProvider