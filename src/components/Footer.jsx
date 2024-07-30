// import wave from "../assets/wave.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer h-[10rem] flex  items-center justify-center flex-col">
        <p>
          &#169;
          {year} <span className="accent">Deepanshu</span>
        </p>
        <div className="flex gap-3 mt-2 p-1">
          <Link
            className="pl-2 pr-2"
            to="https://github.com/DeepanshuYadavd"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} size="1x" />
          </Link>
          <Link
            className="pl-2 pr-2"
            to="https://www.linkedin.com/in/deepanshuyadav12/"
            target="_blank"
          >
            {" "}
            <FontAwesomeIcon icon={faLinkedin} size="1x" />
          </Link>
        </div>
      </div>
      {/* <img className="w-[100%]" src={wave} alt="" /> */}
    </>
  );
};

export default Footer;
