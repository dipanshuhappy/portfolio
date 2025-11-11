import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getAchievements } from 'app/achievements/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let achievements = getAchievements()

  return achievements.map((achievement) => ({
    slug: achievement.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  let achievement = getAchievements().find((achievement) => achievement.slug === slug)
  if (!achievement) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = achievement.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/achievements/${achievement.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Achievement({ params }) {
  const { slug } = await params
  let achievement = getAchievements().find((achievement) => achievement.slug === slug)

  if (!achievement) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: achievement.metadata.title,
            datePublished: achievement.metadata.publishedAt,
            dateModified: achievement.metadata.publishedAt,
            description: achievement.metadata.summary,
            image: achievement.metadata.image
              ? `${baseUrl}${achievement.metadata.image}`
              : `/og?title=${encodeURIComponent(achievement.metadata.title)}`,
            url: `${baseUrl}/achievements/${achievement.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {achievement.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(achievement.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={achievement.content} />
      </article>
    </section>
  )
}
