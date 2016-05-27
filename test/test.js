import test from 'tape'
import markdownToSlidesServer from '../index.js'
import path from 'path'

const markdown = path.join(__dirname, 'fixtures/', 'slides.md')
const port = 9999
const open = false
const title = 'sample title'
const style = path.join(__dirname, 'fixtures/', 'style.css')

test('markdown-to-slides-server with all options', (t) => {
  const quit = markdownToSlidesServer({markdown, port, open, title, style})

  t.equal(
    typeof quit
    , 'function'
    , 'returns a quit function'
  )

  t.end()
  // quit needs to happen after the test ends, else we get an error
  quit()
})

test('markdown-to-slides-server with minimum options', (t) => {
  const quit = markdownToSlidesServer({markdown})

  t.equal(
    typeof quit
    , 'function'
    , 'returns a quit function'
  )

  t.end()
  // quit needs to happen after the test ends, else we get an error
  quit()
})
