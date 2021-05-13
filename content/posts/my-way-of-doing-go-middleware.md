---
title: "My Way of Doing Go Middleware" # Title of the blog post.
date: 2021-05-10T14:48:07+01:00 # Date of post creation.
description: "Article description." # Description used for search engine.
featured: true # Sets if post is a featured post, making it appear on the sidebar. A featured post won't be listed on the sidebar if it's the current page
draft: false # Sets whether to render this page. Draft of true will not be rendered.
toc: false # Controls if a table of contents should be generated for first-level links automatically.
# menu: main
# featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
shareImage: "/images/path/share.png" # Designate a separate image for social media sharing.
codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: false # Override global value for showing of line numbers within code block.
figurePositionShow: true # Override global value for showing the figure label.
categories:
  - Technology
  - Development
tags:
  - Go
---

I recently had a task to work on some refactoring of scary code, and so used this as an excuse to try out some different ways of serving up an api. Over the years, I have taken inspiration from various ideas ()...

Middleware

Here's some go to start off with:

``` go
func mwResponseWrapper(handler func(*http.Request) (OkResponse, error)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		okResp, err := handler(r)
		if err != nil {
			handleError(w, r, err)
			return
		}

		// Ok Response...
		w.WriteHeader(okResp.SuccessStatusCode())
		_, ok := okResp.(response.GenericResponse)
		if !ok {
			w.Header().Add("Content-Type", "application/json")
			if err := json.NewEncoder(w).Encode(okResp); err != nil {
				w.Write([]byte(err.Error()))
				return
			}
		}
	}
}
```