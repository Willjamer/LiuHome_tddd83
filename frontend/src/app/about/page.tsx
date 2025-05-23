import React from 'react';
import '@/styles/hover-scale.css'; // Importera CSS-filen

const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <main className="flex-1 p-8 space-y-16 max-w-3xl mx-auto">
        {/* <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1> */}

        <section
          className="relative w-screen min-h-[750px] bg-cover bg-center left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-[32px]"
          style={{ backgroundImage: "url('/images/About-OurMission.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 text-white">
            <div className="max-w-3xl text-center">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p>
                liuHome was founded in August 2025 with a simple yet powerful vision: to make the process of finding housing easier for students. Our goal is to bridge the gap between students and landlords, offering an easy-to-use website. At liuHome, we believe that finding a place to live should be one less worry on your list.
                We also believe in the power of community. Our platform encourages students to connect with each other. Our team is made up of passionate individuals who are committed to improving the student housing experience. Thank you for choosing liuHome. We are excited to be part of your housing journey.
              </p>
            </div>
          </div>
        </section>

        <section
          className="relative w-screen min-h-[750px] bg-cover bg-center left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-[65px]"
          style={{ backgroundImage: "url('/images/WhoWeAre.png')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 text-white">
            <div className="max-w-3xl text-center">
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p>
                We are a group of 9 students from the Industrial Engineering and Management section at Linköping University. The goal of our thesis is not only to meet the requirements for graduation but also to contribute to a meaningful project.
              </p>
            </div>
          </div>
        </section>


        <section id="Terms,Privacy and Contact" className="flex flex-col items-center bg-blue-50 justify-center rounded-lg">

          {/* Terms */}
          <section id="terms" className="flex-1 min-h-[200px] flex items-center justify-center rounded-lg" style={{ scrollMarginTop: "100px", marginBottom: "0px" }}>
            <div className="max-w-3xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-6 underline">Terms</h2>
              <ul className="list-disc list-inside text-lg mb-4 space-y-2">
                <p className="text-left mb-8 ">
                  By using liuHome, you agree to follow our terms and conditions. We created this platform to help students and landlords connect in a smooth and trustworthy way. To keep the experience safe and fair for everyone, we ask that you:
                </p>
                <li className="text-left font-bold">Only post accurate and truthful information</li>
                <li className="text-left font-bold">Respect other users and communicate respectfully</li>
                <li className="text-left font-bold">Do not misuse or attempt to harm the platform</li>
                <li className="text-left font-bold">Only use liuHome for its intended purpose: finding or sharing housing information</li></ul>
              <p className="text-lg mb-4">
                liuHome is not responsible for the outcome of agreements made between students and landlords - we simply provide the platform. If you have questions about our terms, feel free to contact us.
              </p>
            </div>
          </section>

          {/* Privacy and contact  */}
          {/* <div id="privacyandcontact" className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex flex-row items-stretch justify-center gap-8 bg-white-50 p-8"> */}
          <section id="privacy" className="flex-1 min-h-[200px] bg-blue-50 rounded-lg flex items-center justify-center">
            <div className="max-w-3xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-6 underline">Privacy</h2>
              <p className="text-lg mb-4">
                At liuHome, we value your privacy. We are committed to protecting your personal information and ensuring that your data is handled securely. For more details, please refer to our Privacy Policy.
              </p>
            </div>
          </section>

          <section id="contact" className="flex-1 min-h-[200px] bg-blue-50 rounded-lg flex items-center justify-center">
            <div className="max-w-3xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-6 underline">Contact Us</h2>
              <p className="text-lg mb-4">
                Have questions or need assistance? We’re here to help! Reach out to us anytime.
              </p>
              <div className="flex flex-col items-center gap-4">
                <a
                  href="mailto:nilvo233@student.liu.se"
                  className="text-blue-500 hover:underline text-lg"
                >
                  Contact HR                </a>
              </div>
            </div>
          </section>
          {/* </div> */}

        </section>

      </main>
    </div>
  );
};

export default AboutPage;