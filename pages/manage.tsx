import Link from 'next/link'

import { getSSRProps } from '../utils/auth/ServerAuth'

export const getServerSideProps = async (ctx) => {
    const props = await getSSRProps(ctx)
    return props
}

const Manage = (props) => {
    const { user } = props
    console.log(user)
    return (
        <>
        <div className="container px-8 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                { user.programs.map((program) => {
                    return (
                        <Link key={program.id} href={'/dash/' + program.id}>
                            <a key={program.id} className="px-4 py-2 rounded shadow">
                                { program.name }
                            </a>
                        </Link>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Manage