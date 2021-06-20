import { getSSRPropsRedeem } from '../../utils/auth/ServerAuth'

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsRedeem(ctx)
    return props
}

const RewardRedeem = (props) => {
    console.log(props)
    const { available } = props

    return (
        <>
        <p>hello world!</p>
        </>
    )
}

export default RewardRedeem