import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'jobtitle',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: "companyLogo",
      title: "Company Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'dateStarted',
      title: 'Date Started',
      type: 'string',
    }),
    defineField({
      name: 'dateEnded',
      title: 'Date Ended',
      type: 'string',
   
    }),
    defineField({
      name: 'isCurrentlyWorkingThere',
      title: 'Is Currently Working There',
      type: 'boolean',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'skill'}]}],
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [{type: 'string'}],
    }),

  ],

})
