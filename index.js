import browserSync from 'browser-sync'
import nodemon from 'nodemon'
import path from 'path'
import os from 'os'
import mkdirp from 'mkdirp'

const htmlFileName = 'index.html'

const startBrowserSync = ({dir, port, markdownFile, open, style}) => {
  const bs = browserSync.create(markdownFile)
  const watchFiles = [
    path.join(dir, htmlFileName)
  , style
  ]

  bs.init({
    server: dir
    , port
    , files: watchFiles
    , ghostMode: false
    , online: false
    , notify: false
    , open
  })

  return () => bs.exit()
}

const watchFiles = ({markdownFile, title, dir, style}) => {
  const executablePath = path.join(__dirname, 'node_modules', '.bin/', 'markdown-to-slides')
  nodemon({
    execMap: {
      md: `${executablePath} -t "${title}" -o "${path.join(dir, htmlFileName)}" -d "${markdownFile}"` + (style ? ` -s "${style}"` : ``)
    }
    , watch: [markdownFile, style]
    , script: markdownFile
  })

  return () => nodemon.emit('quit')
}

export default ({port, markdown, open, title, style} = {}) => {
  const dir = path.join(os.tmpDir(), path.basename(__dirname))
  mkdirp.sync(dir)

  const options = {dir, port, open, title, style, markdownFile: markdown}
  options.title || (options.title = path.basename(markdown))

  const closers = [
    watchFiles(options)
  , startBrowserSync(options)
  ]

  return () => closers.forEach((x) => x())
}
