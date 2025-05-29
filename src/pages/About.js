import React from 'react';

const founders = [
  {
    name: 'Soham Deshmukh',
    title: 'Lead Front-End Developer',
    image: '/imgs/soham.jpg',
    bio: "Not available."
  },
  {
    name: 'Neven Zurcher',
    title: 'Lead Back-End Developer',
    image: '/imgs/neven.jpg',
    bio: "I am passionate in Software Development, studying Computer Science at Drexel University's College of Computing & Informatics with a growing interest in AI and Machine Learning. I am eager to contribute to impactful software solutions that blend user-focused design with intelligent automation, helping shape the future of tech-driven innovation."
},
  {
    name: 'Riley Robbins',
    title: 'Lead Designer',
    image: '/imgs/riley.jpg',
    bio: "I'm a Computer Science student at Drexel University. I have a solid foundation in programming and computing, with experience in Java, Python, HTML, CSS, and Adobe Photoshop. My work experience includes being an Instructor for the American Red Cross, where I taught disaster preparedness to children and various customer service roles at McDonald's and Chipotle, where I developed teamwork and problem-solving skills. This experience has created a passion in combining technology and community service to make a positive impact."
  },
  {
    name: 'Mohammed Mustafa',
    title: 'Product Owner',
    image: '/imgs/soham.jpg',
    bio: "Not available."
  }
];

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Meet Our Founders</h2>
      <div className="row">
        {founders.map((founder, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow rounded-4">
              <img
                src={founder.image}
                className="card-img-top"
                alt={`${founder.name}'s headshot`}
                style={{ objectFit: 'cover', height: '300px', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{founder.name}</h5>
                <p className="text-muted">{founder.title}</p>
                <p className="card-text">{founder.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
