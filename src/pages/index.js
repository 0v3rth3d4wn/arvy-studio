import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import ReactPageScroller from 'react-page-scroller'
import ReactPlayer from 'react-player/lazy'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { motion, useViewportScroll, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CustomButton, CustomLink } from '../components/CustomLink'

import '../styles/home.css'

const FadeInWhenVisible = ({ children, delay = 0 }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.4, delay }}
      variants={{
        visible: {
          opacity: 1,
          translateY: '0px',
        },
        hidden: {
          opacity: 0,
          translateY: '-50px',
        },
      }}
    >
      {children}
    </motion.div>
  )
}

const FullHeightSection = ({
  imgClassName,
  imgAlt,
  imgSrc,
  sectionTitle,
  children,
  sectionClassName,
  id,
  childrenOnly,
}) => (
  <section
    id={id}
    className={`relative flex flex-wrap items-center justify-center h-screen ${sectionClassName}`}
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
    {childrenOnly ? <>{children}</> : null}
  </section>
)

const FullHeightVideoSection = ({
  url,
  id,
  sectionTitle,
  children,
  sectionClassName = '',
  firstSection = false,
  poster,
}) => (
  <section
    id={id}
    className={`relative flex flex-wrap items-center justify-center h-screen ${sectionClassName}`}
    style={{
      backgroundImage: `url(${poster})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
    }}
  >
    <ReactPlayer
      url={url}
      style={{
        width: '100%',
        height: '100vh',
      }}
      config={{
        file: {
          attributes: {
            poster,
          },
        },
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
      <FadeInWhenVisible>
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
      </FadeInWhenVisible>
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

const handlePageChange = (number, setCurrentPage) => {
  setCurrentPage(number)
}

const PageNumbers = ({ currentPage, setCurrentPage }) => {
  const pagesList = []
  for (let i = 0; i <= 4; i++) {
    pagesList.push(
      <li
        className={`w-2 h-2 bg-gray-500 focus:bg-white hover:bg-white duration-300 transition-colors rounded-full cursor-pointer ${
          currentPage === i ? 'active' : ''
        }`}
        key={i}
        onKeyDown={() => {
          handlePageChange(i, setCurrentPage)
        }}
        onClick={() => {
          handlePageChange(i, setCurrentPage)
        }}
      />
    )
  }

  return (
    <ul className="fixed right-0 z-20 flex flex-col flex-wrap p-3 page-dotted-nav rounded-tl-md transform -translate-y-2/4 rounded-bl-md gap-3 top-2/4 bg-black-transparent">
      {[...pagesList]}
    </ul>
  )
}

const HomePage = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <>
      <ReactPageScroller
        pageOnChange={page => {
          handlePageChange(page, setCurrentPage)
        }}
        customPageNumber={currentPage}
      >
        <FullHeightVideoSection
          id="intro"
          url="https://arvy.studio/wp-content/uploads/2021/01/Arvy%20Studio%20Intro%2002-2.m4v"
          sectionTitle="Idea. Visualization. Reality."
          firstSection="true"
          poster={
            data.posterImage.childImageSharp.gatsbyImageData.placeholder
              .fallback
          }
        />
        <FullHeightSection
          id="exteriors"
          sectionTitle="Exteriors"
          imgSrc={getImage(data.exteriorsImage)}
          imgClassName="object-cover w-full h-screen"
          imgAlt="Arvy Studio Exteriors"
        >
          <hr className="absolute top-0 left-0 z-10 w-full h-1 bg-white" />
          <FadeInWhenVisible delay="0.2">
            <p>
              An architectural project is only a project until you can see it
              and feel it. Then it becomes a dream and an endless source for the
              imagination.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay="0.4">
            <p>
              We breathe life into our visualisations by paying special
              attention to the little things that make a difference : a sun
              beam, a reflexion.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay="0.6">
            <FeaturesList>
              <li>Still images</li>
              <li>360 panoramas</li>
              <li>3d floorplans</li>
            </FeaturesList>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay="0.8">
            <LinkList>
              <CustomLink to="/">Learn more</CustomLink>
              <CustomLink to="/work">Full portfolio</CustomLink>
            </LinkList>
          </FadeInWhenVisible>
        </FullHeightSection>
        <FullHeightSection
          id="interiors"
          sectionTitle="Interiors"
          imgSrc={getImage(data.interiorsImage)}
          imgClassName="object-cover w-full h-screen"
          imgAlt="Arvy Studio Interiors"
        >
          <hr className="absolute top-0 left-0 z-10 w-full h-1 bg-white" />
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
          poster={
            data.posterImage.childImageSharp.gatsbyImageData.placeholder
              .fallback
          }
        >
          <hr className="absolute top-0 left-0 z-10 w-full h-1 bg-white" />
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
          imgAlt="Arvy Studio Contact"
          childrenOnly
        >
          <hr className="absolute top-0 left-0 z-10 w-full h-1 bg-white" />
          <hr
            className="absolute top-0 z-10 w-1 h-full bg-white left-1/2"
            style={{
              transform: 'translateX(-2px)',
            }}
          />
          <div className="z-20 p-6 sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl bg-black-transparent">
            <div className="flex flex-wrap">
              <div className="w-full p-6 md:pr-12 md:w-1/2">
                <h3>Structure. Materials. Environment. Light. Snap.</h3>
                <p>
                  Sounds simple? It is for us!
                  <br />
                  We are a group of architects with years of experience, putting
                  everything we know in practice to create life-like
                  visualisations to help you with your design/commercial
                  projects.
                </p>
                <p>
                  We approach every new challenge with a warm heart, cool head
                  and working hands. We don’t provide one-size fits all
                  solutions – we take the time to really understand our clients
                  and their specific needs. And then we make things happen.
                </p>
                <p>
                  If you’d like to know more about us or you’re interested in a
                  collaboration, let us know through any of the channels below
                  and we’ll get back to you promptly about the exciting
                  possibilities that we can offer.{' '}
                </p>
              </div>
              <div className="w-full p-6 md:pl-12 md:w-1/2">
                <p className="mb-8">
                  10B Universitetska str. 1164 Sofia, Bulgaria
                  <br />
                  +359 887 396 385
                  <br /> hello@arvy.studio
                </p>
                <div className="flex flex-wrap mb-8 gap-2">
                  <a className="p-2 text-center text-white bg-black" href="#">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="facebook-f"
                      className="w-6 h-6 svg-inline--fa fa-facebook-f fa-w-10"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                      />
                    </svg>
                  </a>
                  <a className="p-2 text-center text-white bg-black" href="#">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="instagram"
                      className="w-6 h-6 svg-inline--fa fa-instagram fa-w-14"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      />
                    </svg>
                  </a>
                  <a className="p-2 text-center text-white bg-black" href="#">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="youtube"
                      className="w-6 h-6 svg-inline--fa fa-youtube fa-w-18"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                      />
                    </svg>
                  </a>
                </div>
                <Formik
                  initialValues={{ email: '', name: '', message: '' }}
                  validateOnBlur={false}
                  validate={values => {
                    const errors = {}
                    if (!values.email) {
                      errors.email = 'Email is required.'
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = 'Invalid email address'
                    }

                    if (!values.name) {
                      errors.name = 'Name is required.'
                    }

                    if (!values.message) {
                      errors.message = 'Message is required.'
                    }

                    return errors
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2))
                      setSubmitting(false)
                    }, 400)
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-4">
                        <Field
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="block w-3/4 p-3 mb-1 text-base text-black outline-none"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="w-3/4 text-sm font-bold text-right text-red-600"
                        />
                      </div>
                      <div className="mb-4">
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="block w-3/4 p-3 mb-1 text-base text-black outline-none"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="w-3/4 text-sm font-bold text-right text-red-600"
                        />
                      </div>
                      <div className="mb-4">
                        <Field
                          type="text"
                          as="textarea"
                          name="message"
                          placeholder="Message"
                          component="textarea"
                          className="block w-3/4 h-32 p-3 mb-1 text-base text-black outline-none"
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="w-3/4 text-sm font-bold text-right text-red-600"
                        />
                      </div>
                      <CustomButton type="submit" disabled={isSubmitting}>
                        Submit
                      </CustomButton>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </FullHeightSection>
      </ReactPageScroller>
      <PageNumbers currentPage={currentPage} setCurrentPage={setCurrentPage} />
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

    posterImage: file(relativePath: { regex: "/arvy-studio-intro/" }) {
      ...imgFrag
    }
  }
`

export default HomePage
