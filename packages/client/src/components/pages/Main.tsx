import { MainHeader, MainLayout, MainContent } from '@/components'

export default function Main(): JSX.Element {
  return <MainLayout Header={MainHeader} Content={MainContent} />
}
