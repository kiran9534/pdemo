import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} ContentAI. All rights reserved.
            </span>
          </div>
          <div className="flex justify-center mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 mr-6"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 mr-6"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-8 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6">
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-teal-600">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-teal-600">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-teal-600">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;