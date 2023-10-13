import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialMedia',
  title: 'SocialMedia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The platform for social media',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url',
    }),

  ],

})
