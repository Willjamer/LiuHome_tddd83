import React from 'react';
const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col w-full">     
      <main className="flex-1 p-8 space-y-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
       
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>

          <p>
            LiuHome was founded in August 2025 with a simple yet powerful vision: to make the process of finding housing easier for students. Our goal is to bridge the gap between students and landlords, offering an easy-to-use website. At LiuHome, we believe that finding a place to live should be one less worry on your list. 
            We also believe in the power of community. Our platform encourages students to connect with each other. Our team is made up of passionate individuals who are committed to improving the student housing experience. Thank you for choosing LiuHome. We are excited to be part of your housing journey.
          </p>
        </section>

        <section 
          className="relative bg-cover bg-center shadow-md rounded-lg overflow-hidden" 
          style={{ backgroundImage: "url('/images/About-OurMission.jpg')" }}
        >
          <div className="bg-black/50 p-6 text-white">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              LiuHome was founded in August 2025 with a simple yet powerful vision: to make the process of finding housing easier for students. Our goal is to bridge the gap between students and landlords, offering an easy-to-use website. At LiuHome, we believe that finding a place to live should be one less worry on your list. 
              We also believe in the power of community. Our platform encourages students to connect with each other. Our team is made up of passionate individuals who are committed to improving the student housing experience. Thank you for choosing LiuHome. We are excited to be part of your housing journey.
            </p>
          </div>
        </section>
        
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p>
            We are a group of 9 students from the Industrial Engineering and Management section at Linköping University. The goal of our thesis is not only to meet the requirements for graduation but also to contribute to a meaningful project.
          </p>
        </section>
        
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            If you have any questions, feel free to contact us at{' '}
            <a href="mailto:nilvo233@student.liu.se" className="text-blue-500 hover:underline">
              nilvo233@student.liu.se
            </a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;