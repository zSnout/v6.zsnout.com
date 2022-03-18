_Published by [Zachary Sakowitz](https://github.com/zsakowitz) on December
9, 2021._

[GitHub Copilot](https://copilot.github.com/) is an amazing tool that can
autocomplete code snippets for you. In this article I share my experience using
GitHub Copilot: the upsides, the downsides, and what I think it could become.

[toc]

## What is GitHub Copilot?

GitHub Copilot basically completes sections of code for you. There are other
autocompleters, but they'll only complete a single variable or function name,
whereas Copilot completes the entire line. Here's an example:

![An example of Copilot in action](@/assets/copilot-account.png)

The picture above shows me writing a `getPassword` function for the account
system. Once I wrote the function signature, Copilot suggested a function body,
which I got completely correct. You can also see the previously written
`getUsername` function above, which Copilot probably based its suggestion on.

Let's look at another example.

![Another example of Copilot](@/assets/copilot-schema.png)

In this picture it's completing some stuff from a custom schema system into a
Fastify schema. Copilot completes the entire line of code and even recognizes
that it needs to change the name of the schema from `reply` to `response`!

Copilot can also create functions from comments and generate lots of suggestions
for a single prompt, but I've never used these functions. I just use it for the
autocompletion feature.

## The Upsides of Copilot

Some of the things that I love about Copilot are that it's fast, it's
context-aware, and it's easy to use. For example, if I want Copilot to complete
something, I only have to wait a second or so before seeing a result. It also
keeps track of context in a file and will suggest things based on my coding
style. I also love how it just works. Some other tools require you to hit a
keyboard shortcut or something else to trigger it, whereas Copilot starts
itself.

## The Downsides of Copilot

Sometimes Copilot suggests a piece of code when I'm trying to use the standard
autocomplete. This often happens when I'm writing a new piece of code and
Copilot gives a bad suggestion. When it happens I have to hit "Escape", which is
one extra keystroke. However, it's still a great tool overall and I'd recommend
it to anybody except people new to coding or who haven't grasped their language
completely yet.

## Beginners, Avoid Copilot!

While autocompletion tools are great for writing code and can save lots of time,
I think that beginners should avoid them. This is because it can be too easy to
avoid writing your own code, which can make you forget the basics of the
language. This in turn leads to you moving backwards in the progress spectrum,
which is never good.

---

Overall, I think that Copilot is a great tool. I hope that it gets better and
can help more, but I also believe that nobody should rely on it too much.

_zSnout is not affiliated with GitHub or GitHub Copilot in any way. This article
includes opinions from Zachary Sakowitz and does not reflect the opinions of
zSnout as a whole._
