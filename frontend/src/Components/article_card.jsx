export function ArticleCard({ article, baselink, max_width = "450px", fs_title = "xl", fs_text = "base", fs_desc = "sm", hover_out = true }) {
    return (
        <div className={`flex flex-col w-full max-w-[${max_width}] border bg-white rounded-lg group ${hover_out ? 'hover:shadow-2xl hover:-translate-y-1' : ''} transition-all duration-300 ease-linear mx-auto`}>
            <div className='overflow-hidden rounded-tr-lg rounded-tl-lg'>
                <img src={`${baselink}${article.img_link}`} className='w-full group-hover:scale-110 transition-transform ease-linear duration-300'
                    loading='lazy' alt={article.title} />
            </div>
            <div className='flex flex-col px-3'>
                <p className={`text-black font-medium text-${fs_title} truncate`}>
                    {article.title}
                </p>
                <p className={`text-gray-500 text-${fs_text} truncate`}>
                    {article.desc}
                </p>
                <div className={`ml-auto text-${fs_desc} py-2 mt-6 mb-3 flex text-mainCL transition-all duration-300 ease-linear group items-center`}>
                    <a href={article.link} className='cursor-pointer'>Read More</a>
                    <i className={`bi bi-arrow-right-short text-${fs_title} group-hover:translate-x-1 transition-all duration-300 ease-linear`}></i>
                </div>
            </div>

        </div>
    )
}
