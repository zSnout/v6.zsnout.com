# Welcome to zSnout 6!

Hey everybody! We're excited that you've decided to contribute to zSnout or look
at our source. Every new contribution helps and you can help in lots of ways!

The easiest way to help is to browse [zSnout][1] and noting any bugs/issues that
you find as well as anything that could be improved. After looking you can
submit [a bug report or feature request][2] to GitHub and we'll work on it!

You can also prototype code in [StackBlitz][3] without needing to install
anything onto your computer! More information is available under the "Remote
Development" section.

If you're feeling up to the task, you can directly contribute code to zSnout by
submitting a [pull request][4]. When you do, a bot will spin up a preview of the
website and comment on your pull request. Once we approve it your code will be
merged into the official zSnout!

## Remote Development

You can work on zSnout directly in your web browser using [StackBlitz][3]. To
save your project, sign in to StackBlitz and fork the zSnout project after
editing.

To run the development server, execute

```sh
npm run dev
```

in the StackBlitz terminal.

The preview command `npm run preview` doesn't work on StackBlitz, so you can't
view the complete version of the site. However, `npm run dev` should work well
enough.

## Local Development

To work on zSnout locally, run these shell commands:

```sh
git clone https://github.com/zSnout/zsnout.com zsnout
cd zsnout
npm install
```

You can then open zSnout in your code editor and start coding! To start a
development server, run

```sh
npm run dev
```

Note that the dev server will not include the service worker, so the "Install"
button won't appear.

You can preview the complete version by running

```sh
npm run preview
```

Note that the preview server will include the service worker and may not update
properly when testing multiple previews.

[1]: https://zsnout.com/
[2]: https://github.com/zSnout/zsnout.com/issues/new/choose
[3]: https://stackblitz.com/github/zSnout/zsnout.com
[4]: https://github.com/zSnout/zsnout.com/pulls
