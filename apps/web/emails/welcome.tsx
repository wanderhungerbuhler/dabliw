/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

import Footer from './components/footer'

export function WelcomeEmail({
  name = 'Wander Hungerbühler',
  email = 'wander@dabliw.com',
}: {
  name: string | null
  email: string
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Dabliw.com</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src="https://storage.googleapis.com/assets.dabliw.com/android-chrome-512x512.png"
                width="40"
                height="40"
                alt="Dabliw"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Welcome to Dabliw.com
            </Heading>
            <Section className="my-8">
              <Img
                src="https://storage.googleapis.com/assets.dabliw.com/87f456a3-14fa-4416-9d37-3793c12f2086.png"
                alt="Dabliw"
                className="max-w-[500px]"
              />
            </Section>
            <Section className="my-8">
              <Text className="px-5 text-sm leading-6 text-black">
                Thanks for signing up{name && `, ${name}`}!
              </Text>

              <Text className="px-5 text-sm leading-6 text-black">
                My name is Wander Hungerbühler, and I'm the founder of
                Dabliw.com - the modern platform for you to remember and send
                emails of birthday to your friend and family. We're excited to
                have you on board!
              </Text>

              <Text className="px-5 text-sm leading-6 text-black">
                Here are a few things you can do:
              </Text>

              <Text className="ml-1 px-5 text-sm leading-4 text-black">
                ◆ Create birthday person
              </Text>

              <Text className="ml-1 px-5 text-sm leading-4 text-black">
                ◆ Send a birthday wish to your friends and family
              </Text>

              <Text className="px-5 text-sm leading-6 text-black">
                Let me know if you have any questions or feedback. I'm always
                happy to help!
              </Text>

              <Text className="px-5 text-sm font-light leading-6 text-gray-400">
                Wander from Dabliw
              </Text>
            </Section>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
