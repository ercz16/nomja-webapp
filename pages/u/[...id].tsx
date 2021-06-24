import { getSSRPropsRedeem } from '../../utils/auth/ServerAuth'

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsRedeem(ctx)
    return props
}

const None = (props) => {
    return (
        <>
        <p>hello</p>
        </>
    )
}

const Rewards = (props) => {
    return (
        <>
        <p>hello world</p>
        </>
    )
}

const RewardRedeem = (props) => {
    const { available } = props

    return (
        <>
        { available.length == 0 ?
        <None />    
        :
        <Rewards available={available} />}
        </>
    )
}

export default RewardRedeem
