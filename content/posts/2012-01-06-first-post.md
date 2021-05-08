---
title: "First Post"
date: 2012-01-06T19:35:49+01:00
description: "My first ever post"
featured: false
draft: false
toc: false
---

This is my first post using Markdown to make text entry easier.

{{< highlight python >}}
  def func():
    for i in [1, 2, 3]:
	  print "%s" % i
{{< / highlight >}}	  

Here's some csharp:
{{< highlight csharp "linenos=true" >}}
public void testing(123)
{
}
{{< / highlight >}}

Here's some Go:
``` go {linenos=table,hl_lines=[8,"15-17"],linenostart=199}
func main() {
    fmt.Println("hello there")
}
```
    
``` go
func main() {
    // some go code
    fmt.Println("hello there")

    int i := 0
    i += 1
    fmt.Printf("i is %d\n", i)

    // more stuff
    // yeah
    thing := func(i int) error {
        // yeah
        // oohh yeah
        fmt.Printf("i is %d\n", i)
        return
    }

    go thing(i+1)
    thing(i-1)
}
```

That was some code highlighting hopefully....