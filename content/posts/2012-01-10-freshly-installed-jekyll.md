---
title: "Freshly Installed Jekyll" # Title of the blog post.
date: 2012-01-10T16:08:35+01:00 # Date of post creation.
description: "Jekyll working, here's how I did it" # Description used for search engine.
featured: false # Sets if post is a featured post, making it appear on the sidebar. A featured post won't be listed on the sidebar if it's the current page
draft: false # Sets whether to render this page. Draft of true will not be rendered.
toc: false # Controls if a table of contents should be generated for first-level links automatically.
# menu: main
featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
shareImage: "/images/path/share.png" # Designate a separate image for social media sharing.
codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: false # Override global value for showing of line numbers within code block.
figurePositionShow: true # Override global value for showing the figure label.
categories:
  - Technology
tags:
  - Jekyll
  - Heroku
  - meta
---

I've just finished getting an initial blog setup using Heroku to host it, and Jekyll to create a static site. I'm impressed so far. Obviously, the site needs a bit of styling done to it, but the nice thing is that I can easily rerun Jekyll to recreate it with the added styling.

So, welcome to my blog! 

I'm considering writing up a bit about getting it all working, although I have noticed that there are a few blog posts around that probably have plenty of information. I used a couple to get this far - specifically the [Ruby on Rails Tutorial](http://ruby.railstutorial.org/ruby-on-rails-tutorial-book), a blog post [blogging for hackers](http://bionicspirit.com/blog/2012/01/05/blogging-for-hackers.html) by Alexandru Nedelcu, a blog on [migrating from wordpress to jekyll](http://vitobotta.com/how-to-migrate-from-wordpress-to-jekyll/), and the Jekyll usage [instructions](https://github.com/mojombo/jekyll/wiki/usage).

I have only got the bare essentials working right now, and still intend to make use of Google App Engine to act as a CDN as mentioned in Alexandru's post. It's actually pretty impressive that his (free) setup continued to work when he got a pretty large number (10,000) of visits in one day. 

Anyway, I'm happy with what I've got so far, in that the system allows me to blog (we'll see if I do…), and mess around with the site, without worrying about accidentally losing my posts - they're hosted on GitHub, and on Heroku which is itself a git host.

Thanks for reading!