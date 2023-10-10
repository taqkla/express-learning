import mongoose from 'mongoose';
const User = mongoose.model('User');
const Blog = mongoose.model('Blog');

class BlogController {
    async addNewBlog(data) {
        try {
            let insData = new Blog()
            insData.id=data.id
            insData.content=data.content
            insData.author_id=data.author_id
            insData.created_at=data.created_at
            insData.likes_count=data.likes_count
            insData.category=data.category
            let res = await insData.save().then(d => {
                return { status: 200, msg: "Blog added successfully", data: d }
            }).catch(err => {
                return { status: 400, msg: "Error while adding blog", error: err }
            })
            return res;
        }
        catch(error) {
            console.error(error);
            return { status: 500, msg: "Internal Server Error", error: err }
        }
    }

    async updateBlog(data) {
        try {
            let res = await Blog.findOneAndUpdate({ id: data.id }, data).then(d => {
                return { status: 200, msg: "Blog updated successfully", data: d }
            }).catch(err => {
                return { status: 400, msg: "Blog falied to update", error: err }
            });
            return res;
        }
        catch(error) {
            console.error(error);
            return { status: 500, msg: "Internal Server Error", error: err }
        }
    }

    async getBlogsForAuthor(author_id,pageId,limitNo) {
        try {
            let res = await Blog.find({ author_id: author_id })
            .limit(limitNo)
            .skip((pageId-1)*limitNo)
            .then(d => {
                return { status: 200, msg: "Blog(s) fetched successfully", data: d }
            }).catch(err => {
                return { status: 400, msg: "Failed to fetch blog(s)", error: err }
            });
            return res;
        }
        catch(error) {
            console.error(error);
            return { status: 500, msg: "Internal Server Error", error: err }
        }
    }

    async getBlogForAuthor(author_id,blog_id) {
        try {
            let res = await Blog.findOne({ id: blog_id, author_id: author_id }).then(d => {
                return { status: 200, msg: "Blog fetched successfully", data: d }
            }).catch(err => {
                return { status: 400, msg: "Failed to fetch blog", error: err }
            });
            return res;
        }
        catch(error) {
            console.error(error);
            return { status: 500, msg: "Internal Server Error", error: err }
        }
    }

    async deleteBlogForAuthor(author_id,blog_id) {
        try {
            let res = await Blog.findOneAndDelete({ id: blog_id, author_id: author_id }).then(d => {
                return { status: 200, msg: "Blog deleted successfully", data: d }
            }).catch(err => {
                return { status: 400, msg: "Failed to delete blog", error: err }
            });
            return res;
        }
        catch(error) {
            console.error(error);
            return { status: 500, msg: "Internal Server Error", error: err }
        }
    }
}

export default BlogController();