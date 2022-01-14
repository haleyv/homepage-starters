exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: 'blocktype',
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type
            .replace('DatoCms', 'Homepage')
            .replace(/list$/, 'List')
        }
      }
    }
  })

  // abstract interfaces
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      ## DatoCMS specific
      originalId: String
      entityPayload: JSON
    }

    interface HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageLogo implements Node {
      id: ID!
      image: HomepageImage
      alt: String
    }

    interface HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      logos: [HomepageLogo]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageTestimonial implements Node {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    interface HomepageTestimonialList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [HomepageTestimonial]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageBenefit implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    interface HomepageBenefitList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [HomepageBenefit]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageStat implements Node {
      id: ID!
      value: String
      label: String
      heading: String
    }

    interface HomepageStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [HomepageStat]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
      entityPayload: JSON
    }

    interface LayoutHeader implements Node {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      cta: HomepageLink
      entityPayload: JSON
    }

    enum SocialService {
      TWITTER
      FACEBOOK
      INSTAGRAM
      YOUTUBE
      LINKEDIN
      GITHUB
      DISCORD
      TWITCH
    }

    interface SocialLink implements Node {
      id: ID!
      username: String!
      service: SocialService!
    }

    interface LayoutFooter implements Node {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      meta: [HomepageLink]
      socialLinks: [SocialLink]
      copyright: String
      entityPayload: JSON
    }

    interface Layout implements Node {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }
  `)


  actions.createTypes(`
    type DatoCmsLink implements Node & HomepageLink {
      id: ID!
      originalId: String
      entityPayload: JSON
      href: String
      text: String
    }

    type DatoCmsAsset implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      originalId: String
      entityPayload: JSON
    }

    type DatoCmsHero implements Node & HomepageHero & HomepageBlock {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
    }

    type DatoCmsFeature implements Node & HomepageBlock & HomepageFeature {
      originalId: String
      blocktype: String @blocktype
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
      entityPayload: JSON
    }

    type DatoCmsCta implements Node & HomepageBlock & HomepageCta {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      text: String
      links: [HomepageLink]
    }

    ## This is set up differently from Contentful in DatoCMS,
    ## which may need to be adjusted
    type DatoCmsAsset implements Node & HomepageLogo {
      id: ID!
      image: HomepageImage
      alt: String
    }

    type DatoCmsLogolist implements Node & HomepageBlock & HomepageLogoList {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      logos: [HomepageLogo]
    }

    type DatoCmsTestimonial implements Node & HomepageTestimonial {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    type DatoCmsTestimoniallist implements Node & HomepageBlock & HomepageTestimonialList {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      content: [HomepageTestimonial]
    }

    type DatoCmsBenefit implements Node & HomepageBenefit {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    type DatoCmsBenefitlist implements Node & HomepageBlock & HomepageBenefitList {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      content: [HomepageBenefit]
    }

    type DatoCmsStat implements Node & HomepageStat {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type DatoCmsStatlist implements Node & HomepageBlock & HomepageStatList {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      content: [HomepageStat]
    }

    type DatoCmsHomepage implements Node & Homepage {
      id: ID!
      title: String @proxy(from: "entityPayload.attributes.metadata.title")
      description: String @proxy(from: "entityPayload.attributes.metadata.description")
      image: HomepageImage @link(by: "originalId", from: "entityPayload.attributes.metadata.image")
      content: [HomepageBlock]
      entityPayload: JSON
    }
  `)

  // Layout types
  actions.createTypes(`
    type DatoCmsLayoutheader implements Node & LayoutHeader {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      cta: HomepageLink @link(by: "originalId",from: "entityPayload.attributes.cta.0")
      originalId: String
      entityPayload: JSON
    }

    type DatoCmsSocialLink implements Node & SocialLink {
      id: ID!
      username: String!
      service: SocialService!
    }

    type DatoCmsLayoutfooter implements Node & LayoutFooter {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      metalinks: [HomepageLink]
      meta: [HomepageLink] @proxy(from: "entityPayload.attributes.metalinks")
      socialLinks: [SocialLink]
      copyright: String
      originalId: String
      entityPayload: JSON
    }

    type DatoCmsLayout implements Node & Layout {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }
  `)
}

exports.onCreateNode = async ({
  actions,
  node,
  getNode,
  getNodeAndSavePathDependency,
  createNodeId,
}) => {
  // CMS specific node creation
  // For other CMSs, adjust this to map source data to the abstraction needed in the starter
  if (!node.internal.type.includes('DatoCms')) return

  if (node.internal.type === 'DatoCmsLayoutfooter') {
    console.log('footer', node)
  }
}
