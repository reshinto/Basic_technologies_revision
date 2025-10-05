from proxy2 import Blog, AnonUserBlogProxy

blog = Blog()
blog.write()  # can write the blog

proxy = AnonUserBlogProxy(blog)
proxy.write()  # only authorized users can write the blog
