// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    content: { type: 'markdown', required: true },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})
