import { Achievements } from 'app/components/achievements'

export const metadata = {
  title: 'Achievements',
  description: 'Read about my achievements.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Achievements</h1>
      <Achievements />
    </section>
  )
}
