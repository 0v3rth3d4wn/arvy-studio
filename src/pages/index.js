import { graphql } from 'gatsby'
import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ReactPageScroller from 'react-page-scroller'
import ReactPlayer from 'react-player/lazy'
import { CustomLink } from '../components/CustomLink'

const FullHeightSection = ({
  imgClassName,
  imgAlt,
  imgSrc,
  sectionTitle,
  children,
  sectionClassName,
  id,
}) => (
  <section
    id={id}
    className={`relative flex flex-wrap items-center justify-center h-screen border-white ${sectionClassName}`}
  >
    <GatsbyImage
      image={imgSrc}
      alt={imgAlt}
      className={`${imgClassName} absolute z-10`}
      draggable="false"
      imgClassName="select-none"
      imgStyle={{
        WebkitUserDrag: 'none',
      }}
    />
    {sectionTitle ? (
      <div className="z-20 p-6 sm:max-w-4xl bg-black-transparent">
        <h1 className="text-white uppercase">{sectionTitle}</h1>
        {children}
      </div>
    ) : null}
  </section>
)

const FullHeightVideoSection = ({
  url,
  id,
  sectionTitle,
  children,
  sectionClassName = '',
  firstSection = false,
}) => (
  <section
    id={id}
    className={`relative flex flex-wrap items-center justify-center h-screen border-white ${sectionClassName}`}
  >
    <ReactPlayer
      url={url}
      style={{
        width: '100%',
        height: '100vh',
      }}
      width="100%"
      height="100%"
      className="absolute h-screen fullheight-video"
      playing
      autoPlay
      loop
      muted
      playsinline
    />
    {sectionTitle ? (
      <div
        className={`z-20 p-6 sm:max-w-4xl ${
          firstSection ? '' : 'bg-black-transparent'
        }`}
      >
        <h1
          className={`text-white uppercase ${
            firstSection ? 'sm:text-6xl text-center' : ''
          }`}
          style={
            firstSection
              ? {
                  textShadow:
                    'rgb(0 0 0 / 59%) 2px 2px 13px, rgb(73 64 125 / 35%) 2px 4px 7px',
                }
              : null
          }
        >
          {sectionTitle}
        </h1>
        {children}
      </div>
    ) : null}
  </section>
)

const FeaturesList = ({ children }) => (
  <ul className="flex flex-wrap justify-center py-3 text-sm font-semibold uppercase gap-y-2 gap-x-4 sm:justify-between sm:text-lg md:text-xl lg:text-2xl">
    {children}
  </ul>
)

const LinkList = ({ children }) => (
  <div className="flex flex-wrap justify-center pt-4 gap-x-4 sm:justify-around">
    {children}
  </div>
)

const HomePage = ({ data }) => {
  console.log(data)
  return (
    <>
      <ReactPageScroller>
        <FullHeightVideoSection
          id="intro"
          url="https://arvy.studio/wp-content/uploads/2021/01/Arvy%20Studio%20Intro%2002-2.m4v"
          sectionTitle="Idea. Visualization. Reality."
          firstSection="true"
        />
        <FullHeightSection
          id="exteriors"
          sectionTitle="Exteriors"
          imgSrc={getImage(data.exteriorsImage)}
          imgClassName="object-cover w-full h-screen"
          imgAlt="Arvy Studio Exteriors"
        >
          <p>
            An architectural project is only a project until you can see it and
            feel it. Then it becomes a dream and an endless source for the
            imagination.
          </p>
          <p>
            We breathe life into our visualisations by paying special attention
            to the little things that make a difference : a sun beam, a
            reflexion.
          </p>
          <FeaturesList>
            <li>Still images</li>
            <li>360 panoramas</li>
            <li>3d floorplans</li>
          </FeaturesList>
          <LinkList>
            <CustomLink to="/">Learn more</CustomLink>
            <CustomLink to="/work">Full portfolio</CustomLink>
          </LinkList>
        </FullHeightSection>
        <FullHeightSection
          id="interiors"
          sectionTitle="Interiors"
          imgSrc={getImage(data.interiorsImage)}
          imgClassName="object-cover w-full h-screen"
          imgAlt="Arvy Studio Exteriors"
        >
          <p>
            What is the difference between an appartment and a home ? The first
            one is just as set of walls and some materials, the second sounds
            like music, smells like breakfast and feels like a warm embrace.
          </p>
          <p>
            We strive to create our interiors visualisations not just as
            renders, but glimpses into a beautiful future.
          </p>
          <FeaturesList>
            <li>Still images</li>
            <li>360 panoramas</li>
            <li>3d floorplans</li>
          </FeaturesList>
          <LinkList>
            <CustomLink to="/">Learn more</CustomLink>
            <CustomLink to="/work">Full portfolio</CustomLink>
          </LinkList>
        </FullHeightSection>
        <FullHeightVideoSection
          id="animation"
          url="https://arvy.studio/wp-content/uploads/2021/01/ARVY_Services_Animation_02.m4v"
          sectionTitle="Animations"
        >
          <p>1-2-3 Action!</p>
          <p>
            Images are a cool – 60 images per second is even cooler. With our
            animations, we take your imagination to a whole new planet – so that
            even before a brick is laid, future owners can feel the space, start
            thinking of where to put their barbecue and how to fit their whole
            family in the yard for the grand opening.
          </p>
          <FeaturesList>
            <li>Exterior &amp; Interior</li>
            <li>360 around object</li>
            <li>Motion design</li>
          </FeaturesList>
          <LinkList>
            <CustomLink to="/">Learn more</CustomLink>
            <CustomLink to="/work">Full portfolio</CustomLink>
          </LinkList>
        </FullHeightVideoSection>
        <FullHeightSection
          id="contact"
          imgSrc={getImage(data.contactImage)}
          imgClassName="object-cover w-full h-screen"
          imgAlt="Arvy Studio Exteriors"
        />
      </ReactPageScroller>
    </>
  )
}

export const imgFrag = graphql`
  fragment imgFrag on File {
    childImageSharp {
      gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
    }
  }
`
export const exteriorsQuery = graphql`
  query {
    exteriorsImage: file(relativePath: { regex: "/arvy-studio-exteriors/" }) {
      ...imgFrag
    }

    interiorsImage: file(relativePath: { regex: "/arvy-studio-interiors/" }) {
      ...imgFrag
    }

    contactImage: file(relativePath: { regex: "/arvy-studio-contact/" }) {
      ...imgFrag
    }
  }
`

export default HomePage
