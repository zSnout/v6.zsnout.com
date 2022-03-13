# Welcome to zSnout 6!

Hey everybody! We're excited that you've decided to contribute to zSnout or look
at our source. Every new contribution helps and you can help in lots of ways!

The easiest way to help is to browse [zSnout](https://zsnout.web.app/) and
noting any bugs/issues that you find as well as anything that could be improved.
Afterward you can submit
[a bug report or feature request](https://github.com/zSnout/zsnout-vue/issues/new/choose)
to GitHub and we'll start working on it!

You can also prototype code in
[StackBlitz](https://stackblitz.com/github/zsnout/zsnout-vue) without needing to
install anything onto your computer! More information is available under the
"Remote Development" section.

If you're feeling up to the task, you can directly contribute code to zSnout by
submitting a [pull request](https://github.com/zSnout/zsnout-vue/pulls). When
you do, a bot will spin up a preview of the website and comment on your pull
request. Once we approve it your code will be merged into the official zSnout!

## Remote Development

You can work on zSnout directly in your web browser using
[StackBlitz](https://stackblitz.com/github/zsnout/zsnout-vue). To save your
project, sign in to StackBlitz and fork the zSnout project after editing.

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
git clone https://github.com/zsnout/zsnout-vue zsnout
cd zsnout
npm install
```

You can then open zSnout in your code editor and start coding! To start a
preview, run

```sh
npm run dev
```

Note that the preview will _not include the service worker_, so the "Install"
button won't appear.

You can preview the complete version by running

```sh
npm run preview
```
