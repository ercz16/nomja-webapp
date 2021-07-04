import { Navbar, Sidebar } from './index'
import {getSSRPropsUser} from "../../../utils/auth/ServerAuth";

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsUser(ctx)
    return props
}

const Settings = (props) => {
    return (
        <div className="flex flex-col py-6 px-12">
            <p className="font-medium text-xl font-gray-800">Program Settings</p>
        </div>
    )
}

const SettingsPage = (props) => {
    return (
        <div className="flex flex-row">
            <Sidebar props={props} />
            <div className="flex flex-col w-full">
                <Navbar />
                <Settings />
            </div>
        </div>
    )
}

export default SettingsPage