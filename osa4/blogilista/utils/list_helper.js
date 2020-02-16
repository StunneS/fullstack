const dummy = (blogs) => {
    return(
        1
    )
}
const totalLikes = (blogs) => {
    const totalCounter = (sum, item) => {
        return sum + item.likes
    }
    return (
        blogs.reduce(totalCounter,0)
    )
}
const favoriteBlog = (blogs) => {
    const isBetter = (fav, item) => {
        if (fav.likes < item.likes) {
            return item
        }
        return fav
    }
    var fav = blogs.reduce(isBetter,blogs[0])
    var ret = {title: fav.title, author: fav.author, likes: fav.likes}
    return (
        ret
    )   
}
const mostBlogs = (blogs) => {
    var sav = []
    var blogList = blogs.map((item) => {
        var addable = {
            author: item.author,
            blogs: 1
        }
        return addable
    })
    let s = 1
    for (let i = 0; i < blogList.length; i++) {
        s = 1
        for(let j = 0; j < sav.length; j++) {
            if(sav[j].author === blogList[i].author) {
                sav[j].blogs = sav[j].blogs+1
                s = 0
                break
            }
        } 
        if(s === 1) {
            sav = sav.concat(blogList[i])
        } 
    }
    const hasMore = (fav, item) => {
        if (fav.blogs < item.blogs) {
            return item
        }
        return fav
    }
    var most = blogList.reduce(hasMore,sav[0])

    return most
}
const mostLikes = (blogs) => {
    var sav = []
    var blogList = blogs.map((item) => {
        var addable = {
            author: item.author,
            likes: item.likes
        }
        return addable
    })
    let s = 1
    for (let i = 0; i < blogList.length; i++) {
        s = 1
        for(let j = 0; j < sav.length; j++) {
            if(sav[j].author === blogList[i].author) {
                sav[j].likes = sav[j].likes + blogList[i].likes
                s = 0
                break
            }
        } 
        if(s === 1) {
            sav = sav.concat(blogList[i])
        } 
    }
    const hasMore = (fav, item) => {
        if (fav.likes < item.likes) {
            return item
        }
        return fav
    }
    var most = blogList.reduce(hasMore,sav[0])

    return most
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}