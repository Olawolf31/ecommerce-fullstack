import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ActivateUser } from 'features/UserSlice'
import { useAppDispatch } from '../../redux/hooks'
import { toast } from 'react-toastify'

const Activate = () => {

    const { token } = useParams<{ token: string }>()


    const Navigate = useNavigate()

    const dispatch = useAppDispatch()

    //handle activation
    const handleActivation = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            if (token) {
                const response = await dispatch(ActivateUser(token))
                console.log(response)
                if (response.payload.success === true) {
                    toast(response.payload.message, { type: 'success' })
                    Navigate('/login')
                } else if (response.payload.status === "error") {
                    toast(response.payload.message, { type: 'error' })
                }

            }
        } catch (error) {
            console.log(error)
            const err = error as any
            toast(err.response.data.error, { type: 'error' })

        }
    }


    return (

        <section className="bg-gray-50">
            <div
                className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
            >
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Almost there!{' '}
                        <strong className="font-extrabold text-red-700 sm:block">
                            Activate your account
                        </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
                        tenetur fuga ducimus numquam ea!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            onClick={handleActivation}
                        >
                            Activate Account
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Activate