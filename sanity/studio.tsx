import { createRoot } from 'react-dom/client'
import { createStudio } from 'sanity'
import { config } from '../sanity.config'

const studio = createStudio({
  config,
  basePath: '/studio'
})

const root = createRoot(document.getElementById('root')!)
root.render(studio)
