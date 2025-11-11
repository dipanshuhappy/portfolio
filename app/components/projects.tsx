import Link from 'next/link'
import { formatDate, getProjects } from 'app/projects/utils'

interface ProjectsProps {
  limit?: number
  slugs?: string[]
}

export function Projects({ limit, slugs }: ProjectsProps = {}) {
  let allProjects = getProjects()

  // Filter by specific slugs if provided
  if (slugs && slugs.length > 0) {
    allProjects = allProjects.filter(project => slugs.includes(project.slug))
  }

  // Sort by date
  let sortedProjects = allProjects.sort((a, b) => {
    if (
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
    ) {
      return -1
    }
    return 1
  })

  // Apply limit if provided
  if (limit) {
    sortedProjects = sortedProjects.slice(0, limit)
  }

  return (
    <div>
      {sortedProjects.map((project) => (
        <Link
          key={project.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/projects/${project.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(project.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {project.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
