import getCurrentUser from "../actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default async function Sidebar( {children} : {children: React.ReactNode} ) {
    const CurrentUser = await getCurrentUser();
    return(
        <div className="h-full">
            <DesktopSidebar currentUser={CurrentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    );
}