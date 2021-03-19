# Blocks

Here's a built-in way for you to write custom blocks, with less than half the code.

## Demo
1. Clone the WordPress plugin [Headless Blocks](https://github.com/kienstra/headless-blocks) and follow its [setup instructions](https://github.com/kienstra/headless-blocks#setup), including installing the linked Genesis Custom Blocks `.zip`
2. Go to `/wp-admin` > Posts > Add New
3. Add the example 'Email Opt In' block that the Headless Blocks plugin registered: 

![email-opt-in-block](https://user-images.githubusercontent.com/4063887/109478584-0cba5b00-7a3f-11eb-92d0-64f067719ce0.png)

4. Populate the fields with any text: 

![populate-fields](https://user-images.githubusercontent.com/4063887/109479809-68391880-7a40-11eb-97b1-aa48a7a746c9.png)

5. Click outside the block so the preview displays
6. You'll see the preview, a React component: 

![preview-react-component](https://user-images.githubusercontent.com/4063887/109479424-fc56b000-7a3f-11eb-92cb-dcacac7fbd65.gif)

7. Give the post a title of 'Headless Blocks', or whatever you'd lke
8. Publish it
9. On your Next.js front-end, go to that post, maybe http://localhost:3000/headless-blocks
10. Notice how the block is the same as the preview you saw in the block editor
11. Click the button
12. See how the block is interactive, as it's a React component:

![next-js-front-end](https://user-images.githubusercontent.com/4063887/109479512-12fd0700-7a40-11eb-94bf-4415990a1437.gif)

## Local development
1. Ensure that Headless Blocks is [set up](https://github.com/kienstra/headless-blocks#setup)
1. `cd path/to/wp-content/plugins/headless-blocks`
1. `npm link path/to/next.js/repo`
1. That's the full path to your Next.js front-end repo. It will ensure the editor imports the block React components as you develop them.
1. `npm run dev`
1. Open a new Terminal tab
1. `cd path/to/next.js/repo/blocks`
1. That's the `blocks/` directory in your Next.js front-end repo
1. `npm install && npm run dev`
1. Then, when you edit a block in `path/to/next.js/repo/blocks/`, you'll see the changes on the front-end and in the block editor: 

![headless-block-editor](https://user-images.githubusercontent.com/4063887/109479991-9a4a7a80-7a40-11eb-836a-58eae1f7d183.gif)
