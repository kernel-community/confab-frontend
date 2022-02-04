import {NextPage} from 'next';
import Main from 'layouts/Main';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
type Faq = {
  question: string,
  answer: string,
}
const About: NextPage = () => {
  const {pathname} = useRouter();
  const faqs: Faq[] = [
    // {
    //   question: 'What is a Junto?',
    //   answer: `
    //   A uniquely KERNEL experience to connect with other fellows is through organising a Junto. A Junto is a group conversation held to with a common end goal in mind. It is the organiser's responsibility to define a "common purpose" for the group. A Junto could be a Yoga class, an exploration of NFTs, formal verification deep dive, or user testing of products. The motivation behind the word and the concept of Junto comes from Benjamin Franklin discussion groups, here are a few resources if you're interested in the history and meaning of Juntos :)
    //   `,
    // },
    // {
    //   question: 'What is a Guild?',
    //   answer: `
    //     Guilds are shared sense-making environments. They are about co-creative exploration, and differ from juntos in that they include some participatory practice. Such practice can take the form of shared Figma, Miro or Excalidraw boards; drawing, painting or sculpting together; coding together; creating songs, sounds and melodies; playing a game; managing a DAO with D&D prompts and so much more. While juntos are often one-off events, guilds repeat for a set period so you can become more adept with the tools being used, and develop an intuition for the skills being explored together.
    //   `,
    // },
  ];
  return (
    <>
      <NextSeo
        title='About'
        openGraph={{
          url: `https://convo.kernel.community` + {pathname},
          title: `KERNEL Convo`,
          description: 'A home for conversations taking place in the Kernel network',
          images: [
            {
              url: 'https://confab-frontend.vercel.app/images/banner.jpg',
              alt: 'KERNEL squares and circles',
              type: 'image/jpeg',
            },
          ],
          site_name: 'KERNEL Convo',
        }}
      />
      <Main className="mx-auto px-4">
        <div className='
          lg:px-32
          md:px-12
          pl-6
        '>
          <div className="flex flex-col justify-center items-center">
            <div className="
            font-heading
            font-extrabold
            mx-auto
            sm:text-5xl
            text-5xl
            text-primary
          ">
            About
            </div>
            <div className="border border-primary my-12 lg:w-9/12 w-full">
            </div>
          </div>
          <div className='font-primary lg:px-32'>
            <div className='pb-4'>
            Convo is intended to help any community of care craft beautiful conversations. This is a convivial tool which works with us and helps us help each other. We know that cultivating creative, diverse and trusted spaces in which people can be honest and vulnerable is no small task. Convo helps us grow environments for dialogue by easing the coordination required, so we can spend our time and energy where it really matters: relating with other people from the heart.
            </div>
            {
              faqs.map((faq, key) => {
                return (
                  <div key={key} className='py-4'>
                    <span className='font-heading text-2xl font-bold bg-highlight'>{faq.question}</span>
                    <div className='font-primary text-base prose max-w-none'>{faq.answer}</div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </Main>
    </>
  );
};

export default About;
