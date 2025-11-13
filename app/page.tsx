import { BlogPosts } from 'app/components/posts'
// import { Projects } from 'app/components/projects'
import { Achievements } from 'app/components/achievements'

export default function Page() {
  return (
    <section>
      <div className="flex justify-start mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-200 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src="/dipanshu.jpg"
            alt="Dipanshu"
          />
        </div>
      </div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Sup, I'm Dipanshu 🦀
      </h1>
      <p className="mb-4">
        Web3 Developer | Open source rust contributor | 1x founder.
      </p>
      <p className="mb-4">
        Building since 2021. Previously scaled stablecoin infra at @normie.tech. 6x hackathon winner (ETHGlobal, ICP Encode) + Antler NYC Alum.
      </p>

      <div className="my-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">Latest Blog Posts</h2>
        <BlogPosts limit={3} />
      </div>

      {/* <div className="my-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">Featured Projects</h2>
        <Projects limit={3} />
      </div> */}

      <div className="my-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">Recent Achievements</h2>
        <Achievements limit={3} />
      </div>
    </section>
  )
}
