import { Button } from '@/components/atoms'
import { MainLayout } from '@/components/templates'

import { useNavigate } from 'react-router-dom'

interface IProps {
  errorCode: number
}

export default function ErrorPage({ errorCode }: IProps): JSX.Element {
  const navigate = useNavigate()

  return (
    <MainLayout
      content={
        <div className="flex justify-center align-center flex-col items-center h-full">
          <h1 className="text-green-500 text-9xl">{errorCode}</h1>
          <div className="text-white font-bold text-5xl uppercase text-center mt-10">
            You’ve lost. <br /> there’s no way
          </div>

          <Button
            label="get back"
            className="
              bg-green-950
              border-2
              border-green-300
              uppercase
              rounded-lg
              py-[12px] px-[15px]
              w-[471px]
              mt-10
              shadow-[0px_0px_4px_1px]
              shadow-green-300
              text-white
              hover:bg-green-300
              hover:text-green-950
              disabled:bg-stone-500
              disabled:text-stone-400
              disabled:shadow-none
              disabled:border-stone-500
              active:bg-emerald-600
              active:text-green-300
              transition-all
              duration-750
            "
            onClick={() => navigate('/')}
          />
        </div>
      }
    />
  )
}
