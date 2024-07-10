

export interface IPost {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: {
        likes: number
        dislikes: number
    }
    views: number
    userId: number
}

export default function Post({ data }: {data: IPost}) {
  return (
    <div className='min-w-96 p-4 space-y-4 bg-slate-700 rounded-sm'>
        <h2 className='font-bold'>{data.title}</h2>
        <p>{data.body}</p>
        <div className='space-x-2'>
            {data.tags.map((tag) => <span>#{tag}</span>)}
        </div>
        <div className='flex justify-between'>
            <div className='flex space-x-4'>
                <div>
                    👍🏻{data.reactions.likes}
                </div>
                <div>
                    👎🏻{data.reactions.dislikes}
                </div>
            </div>
            <div>
                🙍🏻‍♂️{data.views}
            </div>
        </div>
    </div>
  )
}
