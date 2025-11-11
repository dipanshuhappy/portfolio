import Link from 'next/link'
import { formatDate, getAchievements } from 'app/achievements/utils'

interface AchievementsProps {
  limit?: number
  slugs?: string[]
}

export function Achievements({ limit, slugs }: AchievementsProps = {}) {
  let allAchievements = getAchievements()

  // Filter by specific slugs if provided
  if (slugs && slugs.length > 0) {
    allAchievements = allAchievements.filter(achievement => slugs.includes(achievement.slug))
  }

  // Sort by date
  let sortedAchievements = allAchievements.sort((a, b) => {
    if (
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
    ) {
      return -1
    }
    return 1
  })

  // Apply limit if provided
  if (limit) {
    sortedAchievements = sortedAchievements.slice(0, limit)
  }

  return (
    <div>
      {sortedAchievements.map((achievement) => (
        <Link
          key={achievement.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/achievements/${achievement.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(achievement.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {achievement.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
