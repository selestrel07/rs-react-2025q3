import type { FC, ReactNode } from 'react';
import './About.css';

export const AboutPage: FC = (): ReactNode => {
  return (
    <div className="about-container">
      <p>
        Hello! I&apos;m Dzmitry! This project was created as a homework for{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React course
        </a>
        .
      </p>
      <p>
        I&apos;m experienced QA Automation Engineer with over 6 years of proven
        expertise in developing robust test frameworks, creating and executing
        automated test scripts, and mentoring team members.
      </p>
      <p>
        I have successfully monitored bug resolutions and provided valuable QA
        perspectives to enhance overall software quality. Now actively
        transitioning into Frontend, bringing a deep understanding of
        user-centric design, performance optimization and responsive web
        development. Proficient in modern frontend technologies including
        React.js and TypeScript. Demonstrate a passion for clean, maintainable
        code and a proactive approach to learning and growth. Eager to leverage
        QA experience to build intuitive, high-quality user interfaces and
        robust API services.
      </p>
    </div>
  );
};
